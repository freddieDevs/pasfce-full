import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member, Prisma, Staff } from '@prisma/client';
import { GetMembersFilterDto } from './dto/get-members-filter.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) {}

  async createMember(
    createMemberDto: CreateMemberDto,
    user: Staff,
    selectedClusterid: string,
  ): Promise<Member> {
    const { firstName, surname, email, gender, idNumber, phoneNumber } =
      createMemberDto;
    //TODO: handle the case where there is no clusterId;

    const member = await this.prisma.member.create({
      data: {
        firstName,
        surname,
        email,
        gender,
        idNumber,
        phoneNumber,
        cluster: { connect: { id: selectedClusterid } },
        staff: { connect: { id: user.id } },
        memberId: this.generateMemberId(),
        memberStatus: 'JOINED',
        rewardStatus: 'BEGINNER',
      },
    });
    return member;
  }

  async getMembers(
    filterDto: GetMembersFilterDto,
    user: Staff,
  ): Promise<Member[]> {
    const { searchterm } = filterDto;
    const query: Prisma.MemberFindManyArgs = {
      where: {
        staffId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    };
    if (searchterm) {
      query.where.OR = [
        {
          firstName: {
            contains: searchterm,
            mode: 'insensitive',
          },
        },
        {
          surname: {
            contains: searchterm,
            mode: 'insensitive',
          },
        },
      ];
    }
    const members = await this.prisma.member.findMany(query);
    return members;
  }

  async getMemberById(id: string, user: Staff): Promise<Member> {
    const found = await this.prisma.member.findFirst({
      where: {
        id,
        staffId: user.id,
      },
    });

    if (!found) {
      throw new NotFoundException(`Member with ID ${id}not found`);
    }

    return found;
  }

  async deleteMember(memberId: string, user: Staff): Promise<void> {
    const id = memberId;
    await this.getMemberById(id, user);
    await this.prisma.member.deleteMany({
      where: {
        id: memberId,
        staffId: user.id,
      },
    });
  }

  async updateMember(
    memberId: string,
    updateMemberDto: UpdateMemberDto,
    user: Staff,
  ) {
    const id = memberId;
    const member = await this.getMemberById(id, user);
    member.email = updateMemberDto.email;
    member.phoneNumber = updateMemberDto.phoneNumber;
    member.memberStatus = updateMemberDto.memberStatus;
    member.rewardStatus = updateMemberDto.rewardStatus;

    const updatedMember = await this.prisma.member.update({
      where: {
        id: memberId,
      },
      data: {
        email: updateMemberDto.email,
        phoneNumber: updateMemberDto.phoneNumber,
        memberStatus: updateMemberDto.memberStatus,
        rewardStatus: updateMemberDto.rewardStatus,
      },
    });
    return updatedMember;
  }

  private generateMemberId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const random = Array.from(
      { length: 4 },
      () => characters[Math.floor(Math.random() * characters.length)],
    ).join('');
    const prefix = 'MEM';
    const suffix = 'FCE';

    return `${prefix}${random}${suffix}`;
  }
}
