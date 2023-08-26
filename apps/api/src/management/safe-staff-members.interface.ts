import { Staff } from '@prisma/client';

export type SafeStaffMembers = Omit<Staff, 'password'>;
