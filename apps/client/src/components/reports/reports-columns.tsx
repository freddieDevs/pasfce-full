import { ColumnDef } from "@tanstack/react-table"
import { ReportCellAction } from "./report-cell-action";

export type ReportColumn = {
  id: string;
  createdAt: string;
  newMembers: string;
  inAttendance: string;
  totalMembers: string;
  writtenBy: string | undefined;
  countyName: string | undefined;
  clusterName: string | undefined;
  clusterId: string | undefined;
}

export const reportsColumn: ColumnDef<ReportColumn>[] = [
  {
    accessorKey: 'clusterName',
    header: 'Name of Cluster',
  },
  {
    accessorKey: 'countyName',
    header: 'County',
  },
  {
    accessorKey: 'inAttendance',
    header: 'Members attended',
  },
  {
    accessorKey: 'newMembers',
    header: 'New Members Present',
  },
  {
    accessorKey: 'totalMembers',
    header: 'Total Cluster Members'
  },
  {
    accessorKey: 'writtenBy',
    header: 'Written By',
  },
  {
    accessorKey: 'createdAt',
    header: 'Written on',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <ReportCellAction data={row.original} />
  }
]