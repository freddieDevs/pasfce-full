import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ManagementCredentialsDto } from './dto/management-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class ManagementService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signUp(
    managementCredentialsDto: ManagementCredentialsDto,
  ): Promise<{ staffKey: string }> {
    const {
      firstname,
      idNumber,
      jobPosition,
      password,
      phoneNumber,
      email,
      surname,
    } = managementCredentialsDto;

    const salt = await bcrypt.genSalt();
    const staffKey = this.generateStaffId();
    // console.log({ staffId });

    try {
      await this.prisma.staff.create({
        data: {
          firstname,
          idNumber,
          jobPosition,
          password: await this.hashPassword(password, salt),
          phoneNumber,
          email,
          surname,
          salt,
          staffKey,
        },
      });
      return { staffKey };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Credentials already exist');
      } else {
        // console.log({ error });
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    staffKey: string,
    password: string,
  ): Promise<string> {
    try {
      const staff = await this.prisma.staff.findFirstOrThrow({
        where: {
          staffKey,
        },
      });
      // console.log({ staff });

      async function validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, staff.salt);
        return hash === staff.password;
      }

      if (staff && (await validatePassword(password))) {
        // console.log({ staffId });
        return staff.staffKey;
      } else {
        return null;
      }
    } catch (error) {
      console.log({ error });
    }
  }
  async signIn(
    staffKey: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const result = await this.validateUserPassword(staffKey, password);
    // console.log({ result });

    if (!result) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload: JwtPayload = { result };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  private generateStaffId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const random = Array.from(
      { length: 4 },
      () => characters[Math.floor(Math.random() * characters.length)],
    ).join('');
    const prefix = 'PAS';
    const suffix = 'FCE';

    return `${prefix}${random}${suffix}`;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
