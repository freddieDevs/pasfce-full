import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetClusterFilterDto {
  @IsOptional()
  @IsNotEmpty()
  searchterm: string;
}
