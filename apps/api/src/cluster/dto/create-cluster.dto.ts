import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClusterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  county: string;
}
