import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Cluster, Member } from "@/types/types"
import { Plus } from 'lucide-react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { MemberColumn, memberColumns } from "@/components/members/members-columns"
import { useUpdatedMember } from "@/hooks/use-updated-member"

/**
 * go through clusters and filter members who belong to the particular cluster only and render them
 * usestate, useeffect filtering, params for filtering 
 * when data changes i have to reload the page as my clusterData seems not to be at par with the new data, window.location.href yes it does the refresh job bt its kinda slower and the page seems to be blank
 * i think i can use a loader or maybe add a loading state
 */

export const MembersPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const clusterData = useOutletContext() as Cluster[] | null;
  const { getUpdatedMember } = useUpdatedMember();
  const updatedMember = getUpdatedMember();
  const [members, setMembers] = useState<Member[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (clusterData && params.clusterId) {
      const currentCluster = clusterData.find((cluster) => cluster.id === params.clusterId);
      if (currentCluster) {
        if (updatedMember !== null) {
          const memberIndex = currentCluster.members.findIndex((member) => member.id === updatedMember.id);
          if (memberIndex !== -1) {
            // create a copy of the members array and update 
            const updatedMembersArray = [...currentCluster.members];
            updatedMembersArray[memberIndex] = updatedMember;
            setMembers(updatedMembersArray);
          } 
        } else {
          setMembers(currentCluster.members);
        }
        
      } else {
        setMembers([]);
      }
    }
    setLoading(false);
  }, [clusterData, params.clusterId, updatedMember]);

  if (loading) {
    return null;
  }

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
      <Heading title="Members Data"
        description="Manage your members"
      />
      {/* add a button for adding new members */}
      <Button onClick={() => navigate(`/${params.clusterId}/members/new`)} className="bg-cyan-700 text-accent hover:bg-cyan-800">
        <Plus className="mr-2 h-4 w-4"/>
        Add new member
      </Button>
      </div>
      <Separator className="mt-4"/>
      <DataTable searchKey="firstName" columns={memberColumns} data={formattedMembers}/> 
    </>
  )
}