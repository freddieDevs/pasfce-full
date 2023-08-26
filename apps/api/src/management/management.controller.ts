import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ManagementService } from './management.service';
import { ManagementCredentialsDto } from './dto/management-credentials.dto';

@Controller('management')
export class ManagementController {
  constructor(private managementService: ManagementService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) managementCredentialsDto: ManagementCredentialsDto,
  ): Promise<{ staffKey: string }> {
    managementCredentialsDto.route = 'signup';
    return this.managementService.signUp(managementCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) managementCredentialsDto: ManagementCredentialsDto,
  ): Promise<{ accessToken: string }> {
    managementCredentialsDto.route = 'signin';
    const { staffKey, password } = managementCredentialsDto;
    return this.managementService.signIn(staffKey, password);
  }
}
