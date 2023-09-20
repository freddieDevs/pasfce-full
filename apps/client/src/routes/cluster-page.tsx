import { ClusterColumn, clusterColumns } from "@/components/cluster/cluster-columns";
import { DataTable } from "@/components/data-table";
import { Logo } from "@/components/logo";
import { MobileNavbar } from "@/components/mobile-navbar";
import { Heading } from "@/components/ui/heading";
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

  const formattedClusters: ClusterColumn[] = (clusters ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    createdBy: item.staff.surname,
    county: item.county,
    membersCount: item.members.length,
    reportsCount: item.reports.length,
  }))
  
  return (
    <>
      <div className="px-6 bg-amber-100/90 h-screen">
        <div className=" flex ml-8 pb-4 border-b-2 mb-4 justify-between md:justify-center items-center text-cyan-800">
          <Logo />
          <div className="md:border-l border-slate-300 px-4">
            <h2 className="hidden md:block text-3xl font-bold tracking-tight lg:text-4xl">
            Passionate Road Traffic Safety and Food Chama Empowerment
            </h2>
            <h2 className="md:hidden text-4xl font-bold tracking-wide">PAFCE</h2>
          </div>
          <div className="md:hidden">
            <MobileNavbar data={clusters}/>
          </div>
        </div>
      
        <Heading title="Organisation Clusters" description="all org clusters"/>
        <DataTable searchKey="name" data={formattedClusters} columns={clusterColumns}/>
      </div>
    </>
  )
}