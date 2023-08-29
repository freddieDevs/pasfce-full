import { cn } from '@/lib/utils';
import { useLocation, NavLink, useParams, useOutletContext } from 'react-router-dom'
import ClusterSwitcher from './cluster-switcher';
import { Cluster } from '@/types/types';
import { useEffect, useState } from 'react';

export const Sidebar = () => {
  const { pathname } = useLocation();
  const clustersData = useOutletContext() as Cluster[] | null;
  const [clusterArray, setClusterArray] = useState<Cluster[] | []>([]);
  const params = useParams();

  useEffect(() => {
    if(clustersData === null) {
      setClusterArray([]);
    } else {
      setClusterArray(clustersData);
    }
  }, [clustersData]);

  const routes = [
    {
      href: `/${params.clusterId}`,
      label: 'Dashboard',
      active: pathname === `/${params.clusterId}`,
    },
    {
      href: `/${params.clusterId}/members`,
      label: 'Members',
      active: pathname === `/${params.clusterId}/members`,
    },
    {
      href: `/${params.clusterId}/staffs`,
      label: 'Staffs',
      active: pathname === `/${params.clusterId}/staffs`,
    },
    {
      href: `/${params.clusterId}/savings`,
      label: 'Savings',
      active: pathname === `/${params.clusterId}/savings`,
    }
  ]

  return (
    <div className="flex items-center flex-col gap-y-1 ">
      <ClusterSwitcher items={clusterArray}/>
      {routes.map((route) => (
        <NavLink to={route.href} className={cn('hover:bg-cyan-700/100 hover:text-accent w-full p-2 flex items-center justify-center rounded-lg font-medium', 
        route.active ? 'text-accent bg-cyan-700' : 'text-cyan-800')} key={route.label}>
          {route.label}
        </NavLink>
      ))}
    </div>
  )
}