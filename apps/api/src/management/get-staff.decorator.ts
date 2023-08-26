import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Staff } from '@prisma/client';

export const GetStaff = createParamDecorator(
  (data: unknown, context: ExecutionContext): Staff => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
  // use only when there are relationships
);
