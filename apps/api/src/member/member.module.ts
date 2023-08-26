import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
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
  controllers: [MemberController],
  providers: [MemberService, PrismaService],
})
export class MemberModule {}
