import { MemberForm } from "@/components/members/member-form";
import { Cluster, Member } from "@/types/types";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom"

/**
 * get the clusters 
 * filter clusterData using the clusterId
 * filter members using memberId 
 * if memberId is not found render the new form to create a new member
 * if memberId is found populate the fields with the data
 * there will be a memberform to show this data or be filled with this data
 * data will be passed to the form for rendering
 */
export const MemberIdPage = () => {
  const clusterData = useOutletContext() as Cluster[] | null;
  const params = useParams();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (clusterData && params.clusterId) {
      const currentCluster  = clusterData.find((cluster) => cluster.id === params.clusterId);
      if (currentCluster && params.memberId) {
        const individual = (currentCluster ?? []).members.find((member) => member.id === params.memberId);
        if (individual) {
          setMember(individual);
        } 
        
      }
    } else {
      setMember(null);
    }
    setLoading(false);
  }, [clusterData, params.clusterId, params.memberId])

  if (loading) {
    return null;
  }

  return (
    <>
        <MemberForm data={member || null}/>
    </>
  )
}