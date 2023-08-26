import { Module } from '@nestjs/common';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { ManagementModule } from './management/management.module';
import { MemberModule } from './member/member.module';
import { ReportModule } from './report/report.module';
import { ClusterModule } from './cluster/cluster.module';
import { PassportModule } from '@nestjs/passport';
import { StaffModule } from './staff/staff.module';
@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../..', 'client', 'dist'),
    // }),
    PassportModule,
    PrismaModule,
    StaffModule,
    ManagementModule,
    MemberModule,
    ReportModule,
    ClusterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
