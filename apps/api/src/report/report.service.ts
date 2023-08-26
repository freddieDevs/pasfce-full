import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { Prisma, Report, Staff } from '@prisma/client';
import { GetReportsFilterDto } from './dto/get-report-filter.dto';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  async createReport(
    createReportDto: CreateReportDto,
    user: Staff,
    selectedClusterId: string,
  ) {
    const { clusterTotal, inAttendance, newMembers } = createReportDto;

    const report = await this.prisma.report.create({
      data: {
        cluster: { connect: { id: selectedClusterId } },
        clusterTotal,
        inAttendance,
        newMembers,
        staff: { connect: { id: user.id } },
      },
    });
    return report;
  }

  async getReports(filterDto: GetReportsFilterDto): Promise<Report[]> {
    const { searchterm } = filterDto;

    const query: Prisma.ReportFindManyArgs = {
      where: {},
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        staff: true,
        cluster: true,
      },
    };
    // add search by cluster
    if (searchterm) {
      query.where.OR = [
        {
          staff: {
            firstname: {
              contains: searchterm,
              mode: 'insensitive',
            },
          },
        },
        {
          staff: {
            surname: {
              contains: searchterm,
              mode: 'insensitive',
            },
          },
        },
      ];
    }
    const reports = await this.prisma.report.findMany(query);
    return reports;
  }

  async getReportById(id: string): Promise<Report> {
    const found = await this.prisma.report.findFirst({
      where: {
        id,
      },
      include: {
        staff: true,
        cluster: true,
      },
    });

    if (!found) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    return found;
  }

  async deleteReport(id: string, user: Staff) {
    await this.getReportById(id);
    try {
      await this.prisma.report.deleteMany({
        where: {
          id,
          staffId: user.id,
        },
      });
    } catch (error) {
      throw new UnauthorizedException('Unauthorized operation');
    }
  }

  async updateReport(
    reportId: string,
    createReportDto: CreateReportDto,
    user: Staff,
  ) {
    const id = reportId;
    const report = await this.getReportById(id);

    report.inAttendance = createReportDto.inAttendance;
    report.newMembers = createReportDto.newMembers;
    report.clusterTotal = createReportDto.clusterTotal;

    const updatedReport = await this.prisma.report.update({
      where: {
        id: report.id,
        staffId: user.id,
      },
      data: {
        inAttendance: createReportDto.inAttendance,
        newMembers: createReportDto.newMembers,
        clusterTotal: createReportDto.clusterTotal,
      },
    });
    return updatedReport;
  }
}
