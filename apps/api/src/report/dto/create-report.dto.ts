import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  @IsString()
  newMembers: string;

  @IsNotEmpty()
  @IsString()
  clusterTotal: string;

  @IsNotEmpty()
  @IsString()
  inAttendance: string;
}
