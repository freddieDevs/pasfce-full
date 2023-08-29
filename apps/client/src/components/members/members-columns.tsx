import { ColumnDef } from "@tanstack/react-table";
import { MemberCellAction } from "./member-cell-action";


export type MemberColumn = {
  id: string;
  firstName: string;
  surname: string;
  email: string;
  memberId: string;
  memberStatus: string;
  rewardStatus: string;
  createdAt: string;
}

export const memberColumns: ColumnDef<MemberColumn>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'surname',
    header: 'Surname',
  },
  {
    accessorKey: 'email',
    header: 'Email Address',
  },
  {
    accessorKey: 'memberId',
    header: 'Member ID',
  },
  {
    accessorKey: 'rewardStatus',
    header: 'Reward Status',
  },
  {
    accessorKey: 'memberStatus',
    header: 'Member Status',
  },
  {
    accessorKey: 'createdAt',
    header: 'Joining Date',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <MemberCellAction data={row.original} />
  }
]