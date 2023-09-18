import { Staff } from '@prisma/client';

export type SafeStaffMembers = Omit<Staff, 'password'>;

export type SafestStaff = Omit<SafeStaffMembers, 'salt'>;
