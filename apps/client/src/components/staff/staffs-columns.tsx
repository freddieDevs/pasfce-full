import { ColumnDef } from "@tanstack/react-table";
import { StaffCellAction } from "./staff-cell-action";

export type StaffColumn = {
  id: string;
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  jobPosition: string;
  createdAt: string;
  members: number;
  reports: number;
}

export const staffsColumn: ColumnDef<StaffColumn>[] = [
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
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
  },
  {
    accessorKey: 'jobPosition',
    header: 'Job Position',
  },
  {
    accessorKey: 'members',
    header: 'Members Added',
  },
  {
    accessorKey: 'reports',
    header: 'Reports Added',
  }, 
  {
    accessorKey: 'createdAt',
    header: 'Created At'
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <StaffCellAction data={row.original} />
  }
]