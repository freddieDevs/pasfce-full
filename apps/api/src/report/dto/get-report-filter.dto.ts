import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetReportsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  searchterm: string;
}
