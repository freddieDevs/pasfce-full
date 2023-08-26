import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { GetStaff } from 'src/management/get-staff.decorator';
import { Report, Staff } from '@prisma/client';
import { CreateReportDto } from './dto/create-report.dto';
import { GetReportsFilterDto } from './dto/get-report-filter.dto';

@Controller('reports')
@UseGuards(AuthGuard())
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createReport(
    @Body() createReportDto: CreateReportDto,
    @GetStaff() user: Staff,
    @Query('clusterId') selectedClusterId: string,
  ) {
    return this.reportService.createReport(
      createReportDto,
      user,
      selectedClusterId,
    );
  }

  @Get()
  async getReports(
    @Query(ValidationPipe) filterDto: GetReportsFilterDto,
  ): Promise<Report[]> {
    return this.reportService.getReports(filterDto);
  }

  @Get(':id')
  getReportById(@Param('id') id: string): Promise<Report> {
    return this.reportService.getReportById(id);
  }

  @Delete(':id')
  deleteReport(
    @Param('id') id: string,
    @GetStaff() user: Staff,
  ): Promise<void> {
    return this.reportService.deleteReport(id, user);
  }

  @Patch(':reportId')
  @UsePipes(ValidationPipe)
  updateReport(
    @Param('reportId') reportId: string,
    @Body() createReportDto: CreateReportDto,
    @GetStaff() user: Staff,
  ) {
    return this.reportService.updateReport(reportId, createReportDto, user);
  }
}
