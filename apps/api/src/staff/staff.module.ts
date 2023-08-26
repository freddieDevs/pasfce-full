import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MemberModule } from '../member/member.module';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MemberModule,
    PrismaModule,
  ],
  providers: [StaffService, PrismaService],
  controllers: [StaffController],
})
export class StaffModule {}
