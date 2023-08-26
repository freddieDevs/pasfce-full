import { Role } from '@prisma/client';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class GetStaffFilterDto {
  @IsOptional()
  @IsIn([
    Role.CENTER_MANAGER,
    Role.DIRECTOR,
    Role.FIELD_OFFICER,
    Role.PROJECT_MANAGER,
    Role.REGIONAL_COORDINATOR,
    Role.ZONAL_MANAGER,
  ])
  jobPosition: Role;

  @IsOptional()
  @IsNotEmpty()
  searchterm: string;
}
