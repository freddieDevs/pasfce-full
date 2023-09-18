import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { AuthGuard } from '@nestjs/passport';
import { GetStaffFilterDto } from './dto/get-staff-filter.dto';
import {
  SafeStaffMembers,
  SafestStaff,
} from '../management/safe-staff-members.interface';

@Controller('staff')
@UseGuards(AuthGuard())
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Get()
  async getStaff(
    @Query(ValidationPipe) filterDto: GetStaffFilterDto,
  ): Promise<SafestStaff[]> {
    return this.staffService.getStaff(filterDto);
  }

  @Get(':id')
  async getStaffById(@Param('id') id: string): Promise<SafeStaffMembers> {
    return this.staffService.getStaffById(id);
  }

  @Delete(':id')
  async deleteStaff(@Param('id') id: string): Promise<void> {
    return this.staffService.deleteStaff(id);
  }
}
