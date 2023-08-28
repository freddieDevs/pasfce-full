import { ColumnDef } from "@tanstack/react-table";
import { ClusterCellAction } from "./cluster-cell-action";

export type ClusterColumn = {
  id: string;
  name: string;
  createdBy: string;
  county: string;
  membersCount: number;
  reportsCount: number;
}

export const clusterColumns: ColumnDef<ClusterColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Cluster Name',
  },
  {
    accessorKey: 'county',
    header: 'County',
  },
  {
    accessorKey: 'createdBy',
    header: 'Created By',
  },
  {
    accessorKey: 'membersCount',
    header: 'Number of Members',
  },
  {
    accessorKey: 'reportsCount',
    header: 'Number of Reports',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <ClusterCellAction data={row.original} />
  }
]