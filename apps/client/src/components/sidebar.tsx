import { cn } from '@/lib/utils';
import { useLocation, NavLink } from 'react-router-dom'

export const Sidebar = () => {
  const { pathname } = useLocation();

  const routes = [
    {
      href: '/',
      label: 'Dashboard',
      active: pathname === '/',
    },
    {
      href: '/members',
      label: 'Members',
      active: pathname === '/members',
    },
    {
      href: '/staffs',
      label: 'Staffs',
      active: pathname === '/staffs',
    },
    {
      href: '/newmembers',
      label: 'New Members',
      active: pathname === '/newmembers',
    },
    {
      href: '/savings',
      label: 'Savings',
      active: pathname === '/savings',
    }
  ]

  return (
    <div className="flex items-center flex-col gap-y-1 ">
      {routes.map((route) => (
        <NavLink to={route.href} className={cn(' hover:bg-accent hover:text-accent-foreground w-full p-2 flex items-center justify-center rounded-lg font-medium', 
        route.active ? 'text-black dark:text-white bg-accent' : 'text-muted-foreground')} key={route.label}>
          {route.label}
        </NavLink>
      ))}
    </div>
  )
}