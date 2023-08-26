import { Cluster } from "@/types/types";
import { useLoaderData, useNavigate } from "react-router-dom";

export const ClusterPage = () => {
  const navigate = useNavigate();
  const clusterData = useLoaderData() as Cluster[] | string;
  if (typeof clusterData === 'string' && clusterData === 'unauthorized') {
    navigate('/signin');
    return null;
  }
  

  return (
    <>
      <div>
        cluster page
      </div>
    </>
  )
}