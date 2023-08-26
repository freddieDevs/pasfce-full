import { PipeTransform, BadRequestException } from '@nestjs/common';
import { Status } from '@prisma/client';

export class MemberStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    Status.COMPLETE,
    Status.EXPELLED,
    Status.JOINED,
    Status.PAYING_FEE,
    Status.SUSPENDED,
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
