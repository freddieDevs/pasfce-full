import { columns } from "@/components/columns"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { useMemberModal } from "@/hooks/use-member"
import { Plus } from 'lucide-react'


const data = [
  {
    id: '1',
    name: 'user1',
    createdAt: 'now' 
  },
  {
    id: '2',
    name: 'user2',
    createdAt: 'now' 
  },
  {
    id: '3',
    name: 'user3',
    createdAt: 'now' 
  },
  {
    id: '4',
    name: 'user4',
    createdAt: 'now' 
  },
]

export const MembersPage = () => {
  const memberModal = useMemberModal();
  return (
    <>
      <div className="flex items-center justify-between">
      <Heading title="Sample Data"
        description="Manage your data"
      />
      {/* add a button for adding new members */}
      <Button onClick={() => memberModal.onOpen()}>
        <Plus className="mr-2 h-4 w-4"/>
        Add new member
      </Button>
      </div>
      <Separator className="mt-4"/>
      <DataTable searchKey="name" columns={columns} data={data}/> 
    </>
  )
}