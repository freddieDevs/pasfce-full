import { DashboardCard } from "@/components/dashboard-card"
import { Users2Icon, MoveUpIcon, MoveDownIcon, MoveHorizontalIcon, BringToFront  } from 'lucide-react'

const data = [
  {
    title: 'Total Deposits',
    description: 'SYSTEM TOTAL INCOME',
    amount: '5114',
    Icon: <MoveDownIcon />
  },
  {
    title: 'Float Balance',
    description: 'SYSTEM AVAILABLE',
    amount: '5114',
    Icon: <MoveHorizontalIcon />
  },
  {
    title: 'Total Distributed',
    description: 'SYSTEM TOTAL OUT',
    amount: '0',
    Icon: <MoveUpIcon />
  },
  {
    title: 'Total Members',
    description: 'SYSTEM MEMBERS',
    amount: '1465',
    Icon: <Users2Icon />
  },
  {
    title: 'Total Clusters',
    description: 'SYSTEM CLUSTERS',
    amount: '82',
    Icon: <BringToFront />
  },
  {
    title: 'Total Groups',
    description: 'SYSTEM GROUPS',
    amount: '1',
    Icon: <Users2Icon />
  }
]

export const DashboardPage = () => {

  return (
    <div>
      <DashboardCard data={data}/>
    </div>
  )
}