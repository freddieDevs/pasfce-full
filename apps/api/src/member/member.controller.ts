import {
  Controller,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Post,
  Body,
  Get,
  Query,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { GetStaff } from '../management/get-staff.decorator';
import { Member, Staff } from '@prisma/client';
import { GetMembersFilterDto } from './dto/get-members-filter.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('members')
@UseGuards(AuthGuard())
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createMember(
    @Body() createMemberDto: CreateMemberDto,
    @GetStaff() user: Staff,
    @Query('clusterId') selectedClusterId: string,
  ) {
    return this.memberService.createMember(
      createMemberDto,
      user,
      selectedClusterId,
    );
  }

  @Get()
  async getMembers(
    @Query(ValidationPipe) filterDto: GetMembersFilterDto,
    @GetStaff() user: Staff,
  ): Promise<Member[]> {
    return this.memberService.getMembers(filterDto, user);
  }

  @Get(':id')
  getMemberById(
    @Param('id') id: string,
    @GetStaff() user: Staff,
  ): Promise<Member> {
    return this.memberService.getMemberById(id, user);
  }

  @Delete(':memberId')
  deleteMember(
    @Param('memberId') memberId: string,
    @GetStaff() user: Staff,
  ): Promise<void> {
    return this.memberService.deleteMember(memberId, user);
  }

  @Patch(':memberId')
  @UsePipes(ValidationPipe)
  updateMember(
    @Param('memberId') memberId: string,
    @Body() updateMemberDto: UpdateMemberDto,
    @GetStaff() user: Staff,
  ) {
    return this.memberService.updateMember(memberId, updateMemberDto, user);
  }
}
