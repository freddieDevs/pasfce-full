import { Cluster } from "@/types/types";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export const ClusterPage = () => {
  const navigate = useNavigate();
  const clusterData = useLoaderData() as Cluster[] | string;
  const [clusters, setClusters] = useState<Cluster[] | null>(null);

  useEffect(() => {
    if (typeof clusterData === 'string' && clusterData === 'unauthorized') {
      navigate('/signin');
      setClusters(null);
    } else if (Array.isArray(clusterData)) {
      //its an array so we only set if its an array
      setClusters(clusterData)
    }
  }, [clusterData, navigate])
  if (typeof clusterData === 'string') {
    
    return null;
  }
  console.log(clusters);
  
  return (
    <>
      <div>
        cluster page
      </div>
    </>
  )
}