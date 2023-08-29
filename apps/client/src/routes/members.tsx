import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { useMemberModal } from "@/hooks/use-member"
import { Cluster, Member } from "@/types/types"
import { Plus } from 'lucide-react'
import { useOutletContext, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { MemberColumn, memberColumns } from "@/components/members/members-columns"

/**
 * go through clusters and filter members who belong to the particular cluster only and render them
 * usestate, useeffect filtering, params for filtering 
 */

export const MembersPage = () => {
  const memberModal = useMemberModal();
  const params = useParams();
  const clusterData = useOutletContext() as Cluster[] | null;
  const [members, setMembers] = useState<Member[] | []>([]);

  useEffect(() => {
    if (clusterData && params.clusterId) {
      const currentCluster = clusterData.find((cluster) => cluster.id === params.clusterId);
      if (currentCluster) {
        setMembers(currentCluster.members);
      } else {
        setMembers([]);
      }
    }
  }, [clusterData, params.clusterId]);

  const formattedMembers: MemberColumn[] = members.map((item) => ({
    id: item.id,
    firstName: item.firstName,
    surname: item.surname,
    email: item.email,
    memberId: item.memberId,
    memberStatus: item.memberStatus,
    rewardStatus: item.rewardStatus,                            
    createdAt: format(new Date(item.createdAt), 'dd MMMM yyyy'),
  }))
  
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
      <DataTable searchKey="name" columns={memberColumns} data={formattedMembers}/> 
    </>
  )
}