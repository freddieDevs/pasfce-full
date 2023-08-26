import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Body,
  UsePipes,
  Get,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { GetStaff } from '../management/get-staff.decorator';
import { Cluster, Staff } from '@prisma/client';
import { CreateClusterDto } from './dto/create-cluster.dto';
import { GetClusterFilterDto } from './dto/get-cluster-filter.dto';

@Controller('clusters')
@UseGuards(AuthGuard())
export class ClusterController {
  constructor(private clusterService: ClusterService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createCluster(
    @Body() createClusterDto: CreateClusterDto,
    @GetStaff() user: Staff,
  ): Promise<Cluster> {
    return this.clusterService.createCluster(createClusterDto, user);
  }

  @Get()
  getClusters(
    @Query(ValidationPipe) filterDto: GetClusterFilterDto,
    @GetStaff() user: Staff,
  ): Promise<Cluster[]> {
    return this.clusterService.getClusters(filterDto, user);
  }

  @Get(':id')
  getClusterById(
    @Param('id') id: string,
    @GetStaff() user: Staff,
  ): Promise<Cluster> {
    return this.clusterService.getClusterById(id, user);
  }

  @Delete(':id')
  deleteCluster(@Param('id') id: string, @GetStaff() user: Staff) {
    return this.clusterService.deleteCluster(id, user);
  }
}
