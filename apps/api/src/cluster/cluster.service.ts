import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClusterDto } from './dto/create-cluster.dto';
import { Cluster, Prisma, Staff } from '@prisma/client';
import { GetClusterFilterDto } from './dto/get-cluster-filter.dto';

@Injectable()
export class ClusterService {
  constructor(private prisma: PrismaService) {}

  async createCluster(
    createClusterDto: CreateClusterDto,
    user: Staff,
  ): Promise<Cluster> {
    const { name, county } = createClusterDto;

    const cluster = await this.prisma.cluster.create({
      data: {
        name,
        county,
        staffId: user.id,
      },
    });
    // Connect the cluster to the creator (user) after the cluster is created
    await this.prisma.staff.update({
      where: { id: user.id },
      data: {
        clusters: { connect: { id: cluster.id } },
      },
    });
    return cluster;
  }

  async getClusters(
    filterDto: GetClusterFilterDto,
    user: Staff,
  ): Promise<Cluster[]> {
    const { searchterm } = filterDto;
    const query: Prisma.ClusterFindManyArgs = {
      where: {
        staffId: user.id,
      },
      include: {
        members: true,
        reports: true,
        staff: {
          select: {
            id: true,
            firstname: true,
            surname: true,
            staffKey: true,
            phoneNumber: true,
            email: true,
            idNumber: true,
            createdAt: true,
            updatedAt: true,
            jobPosition: true,
          },
        },
      },
    };
    if (searchterm) {
      query.where.OR = [
        {
          name: {
            contains: searchterm,
            mode: 'insensitive',
          },
        },
        {
          county: {
            contains: searchterm,
            mode: 'insensitive',
          },
        },
      ];
    }
    const clusters = await this.prisma.cluster.findMany(query);
    return clusters;
  }

  async getClusterById(id: string, user: Staff): Promise<Cluster> {
    const found = await this.prisma.cluster.findFirst({
      where: {
        id,
        staffId: user.id,
      },
      include: {
        members: true,
        reports: true,
      },
    });
    return found;
  }

  async deleteCluster(id: string, user: Staff) {
    const cluster = await this.prisma.cluster.findFirst({
      where: {
        id,
        staffId: user.id,
      },
      include: {
        members: true,
        reports: true,
      },
    });
    if (cluster.members.length === 0 && cluster.reports.length === 0) {
      await this.prisma.cluster.delete({
        where: {
          id,
          staffId: user.id,
        },
      });
    } else {
      throw new ForbiddenException(
        'Cant delete cluster with active components',
      );
    }
  }
}
