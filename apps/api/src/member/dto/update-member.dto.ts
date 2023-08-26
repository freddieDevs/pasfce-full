import { RewardLevel, Status } from '@prisma/client';
import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class UpdateMemberDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsIn([
    RewardLevel.ADVANCED,
    RewardLevel.BABYBEAR,
    RewardLevel.BEGINNER,
    RewardLevel.BRONZE,
    RewardLevel.GLOBAL,
    RewardLevel.GOLD,
    RewardLevel.MAMABEAR,
    RewardLevel.PAPABEAR,
    RewardLevel.PERENIAL,
    RewardLevel.PLATINUM,
    RewardLevel.SILVER,
  ])
  @IsNotEmpty()
  rewardStatus: RewardLevel;

  @IsIn([
    Status.COMPLETE,
    Status.EXPELLED,
    Status.JOINED,
    Status.PAYING_FEE,
    Status.SUSPENDED,
  ])
  @IsNotEmpty()
  memberStatus: Status;
}
