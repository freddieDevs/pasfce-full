import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetMembersFilterDto {
  @IsOptional()
  @IsNotEmpty()
  searchterm: string;
}
