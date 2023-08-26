import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ManagementModule } from '../management/management.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ManagementModule,
    PrismaModule,
  ],
  providers: [ReportService, PrismaService],
  controllers: [ReportController],
})
export class ReportModule {}
