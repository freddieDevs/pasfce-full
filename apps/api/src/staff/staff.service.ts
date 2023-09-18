import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetStaffFilterDto } from './dto/get-staff-filter.dto';
import { Prisma, Staff } from '@prisma/client';
import {
  SafeStaffMembers,
  SafestStaff,
} from '../management/safe-staff-members.interface';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async getStaff(filterDto: GetStaffFilterDto): Promise<SafestStaff[]> {
    const { jobPosition, searchterm } = filterDto ?? {};
    const query: Prisma.StaffFindManyArgs = {
      where: {},
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        members: true,
        reports: true,
        clusters: true,
      },
    };
    if (jobPosition) {
      query.where.jobPosition = jobPosition;
    }

    if (searchterm) {
      query.where.OR = [
        {
          firstname: {
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
    const staffMembers: Staff[] = await this.prisma.staff.findMany(query);
    const filteredStaff = staffMembers.map(
      ({ password, salt, ...rest }) => rest,
    );
    return filteredStaff;
  }

  async getStaffById(id: string): Promise<SafeStaffMembers> {
    const found = await this.prisma.staff.findFirst({
      where: {
        id,
      },
    });
    if (!found) {
      throw new NotFoundException(`staff with ID ${id} not found`);
    }
    const sensitive = ['password'];
    const safeStaff = {} as SafeStaffMembers;
    for (const key in found) {
      if (found.hasOwnProperty(key) && !sensitive.includes(key)) {
        safeStaff[key] = found[key];
      }
    }
    return safeStaff;
  }

  async deleteStaff(id: string): Promise<void> {
    await this.getStaffById(id);
    await this.prisma.staff.delete({
      where: {
        id,
      },
    });
  }
}
