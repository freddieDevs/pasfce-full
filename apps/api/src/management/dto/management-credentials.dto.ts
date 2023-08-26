import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

enum Role {
  DIRECTOR = 'DIRECTOR',
  PROJECT_MANAGER = 'PROJECT_MANAGER',
  REGIONAL_COORDINATOR = 'REGIONAL_COORDINATOR',
  ZONAL_MANAGER = 'ZONAL_MANAGER',
  CENTER_MANAGER = 'CENTER_MANAGER',
  FIELD_OFFICER = 'FIELD_OFFICER',
}

export class ManagementCredentialsDto {
  @IsString()
  @IsNotEmpty()
  @ValidateIf((obj, route) => obj.route === 'signin')
  staffKey: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*).',
  })
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @ValidateIf((obj, value) => obj.route === 'signup')
  email?: string;

  route: string;

  @IsNotEmpty()
  @ValidateIf((obj, value) => obj.route === 'signup')
  firstname: string;

  @IsNotEmpty()
  @ValidateIf((obj, value) => obj.route === 'signup')
  surname: string;

  @IsNotEmpty()
  @ValidateIf((obj, value) => obj.route === 'signup')
  phoneNumber: string;

  @IsNotEmpty()
  @ValidateIf((obj, value) => obj.route === 'signup')
  jobPosition: Role;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((obj, value) => obj.route === 'signup')
  idNumber: string;
}
