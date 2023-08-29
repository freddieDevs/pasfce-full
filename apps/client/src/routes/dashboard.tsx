import { DashboardCard } from "@/components/dashboard-card"
import { Cluster } from "@/types/types";
import { Users2Icon, MoveUpIcon, MoveDownIcon, MoveHorizontalIcon, BringToFront  } from 'lucide-react'
import { useOutletContext } from 'react-router-dom';

const data = [
  {
    title: 'Total Deposits',
    description: 'SYSTEM TOTAL INCOME',
    amount: 5114,
    Icon: <MoveDownIcon />
  },
  {
    title: 'Float Balance',
    description: 'SYSTEM AVAILABLE',
    amount: 5114,
    Icon: <MoveHorizontalIcon />
  },
  {
    title: 'Total Distributed',
    description: 'SYSTEM TOTAL OUT',
    amount: 0,
    Icon: <MoveUpIcon />
  },
  {
    title: 'Total Groups',
    description: 'SYSTEM GROUPS',
    amount: 1,
    Icon: <Users2Icon />
  }
]

export const DashboardPage = () => {
  const clustersData = useOutletContext() as Cluster[] | null;
  /**
   * get count of clusters
   * get count of total members
   * get count of all staff
   */

  // calculate members
  const memberCounts = (clustersData ?? []).map((cluster) => cluster.members.length);

  // calculate clusters 
  const clusterCount = memberCounts.length;

  // total members
  const totalMembers = memberCounts.reduce((total, count) => total + count, 0)

  const formattedData = [
    ...data,
    {
      title: 'Total Members',
      description: 'SYSTEM MEMBERS',
      amount: totalMembers,
      Icon: <Users2Icon />
    },
    {
      title: 'Total Clusters',
      description: 'SYSTEM CLUSTERS',
      amount: clusterCount,
      Icon: <BringToFront />
    },
  ]

  
  return (
    <div>
      <DashboardCard data={formattedData}/>
    </div>
  )
}