export interface Cluster {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  county: string;
  staffId: string;
  reports: Report[];
  members: Member[];
  staff: Staff;
}

export interface Report {
  id: string;
  createdAt: string;
  updatedAt: string;
  clusterId: string;
  inAttendance: string;
  newMembers: string;
  staffId: string;
  clusterTotal: string;
}

export interface Member {
  clusterId: string;
  createdAt: string;
  email: string;
  firstName: string;
  gender: string;
  id: string;
  idNumber: string;
  memberId: string;
  memberStatus: Status;
  phoneNumber: string;
  rewardStatus: RewardLevel;
  staffId: string;
  surname: string;
  updatedAt: string;
}

export enum Status {
  JOINED = 'JOINED',
  COMPLETE = 'COMPLETE',
  PAYING_FEE = 'PAYING_FEE',
  SUSPENDED = 'SUSPENDED',
  EXPELLED = 'EXPELLED',
}

export enum RewardLevel {
  BEGINNER = 'BEGINNER',
  BABYBEAR = 'BABYBEAR',
  MAMABEAR = 'MAMABEAR',
  PAPABEAR = 'PAPABEAR',
  PLATINUM = 'PLATINUM',
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  ADVANCED = 'ADVANCED',
  PERENIAL = 'PERENIAL',
  GLOBAL = 'GLOBAL',
}

export interface Staff {
  createdAt: string;
  email: string;
  firstname: string;
  id: string;
  idNumber: string;
  jobPosition: Role;
  phoneNumber: string;
  staffKey: string;
  surname: string;
  updatedAt: string;
}

enum Role {
  DIRECTOR = 'ROLE',
  PROJECT_MANAGER = 'PROJECT_MANAGER',
  REGIONAL_COORDINATOR = 'REGIONAL_COORDINATOR',
  ZONAL_MANAGER = 'ZONAL_MANAGER',
  CENTER_MANAGER = 'CENTER_MANAGER',
  FIELD_OFFICER = 'FIELD_OFFICER',
}

