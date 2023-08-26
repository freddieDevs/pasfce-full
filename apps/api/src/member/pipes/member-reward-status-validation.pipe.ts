import { PipeTransform, BadRequestException } from '@nestjs/common';
import { RewardLevel } from '@prisma/client';

export class MemberRewardStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
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
  ];
  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} value is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
