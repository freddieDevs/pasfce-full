import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "@/components/cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SampleColumn = {
  id: string
  name: string
  createdAt: string
}

export const columns: ColumnDef<SampleColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction  data={row.original}/>
  }
]
