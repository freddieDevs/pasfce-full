import { Logo } from "@/components/logo"
import { MobileNavbar } from "@/components/mobile-navbar"
import { Sidebar } from "@/components/sidebar"
import { Cluster } from "@/types/types"
import { useEffect, useState } from "react"
import { Outlet, useLoaderData, useNavigate } from "react-router-dom"

/**
 * I need to implement redux to manage state changes 
 * as data seems to be stale at some point
 */

export const Root = () => {
  const navigate = useNavigate();
  const data = useLoaderData() as Cluster[] | string;
  const [clusters, setClusters] = useState<Cluster[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof data === 'string' && data === 'unauthorized') {
      navigate('/signin');
      setClusters(null);
    } else if (Array.isArray(data)) {
      setClusters(data);
    }
    setLoading(false);
  }, [data, navigate]);

  if (loading) {
    return null;
  }

  return (
    <>
      
      <div className="bg-amber-100/90">
        <div className=" flex ml-8 pb-4 border-b-2 justify-between md:justify-center items-center text-cyan-800">
          <Logo />
          <div className="md:border-l border-slate-300 px-4">
            <h2 className="hidden md:block text-3xl font-bold tracking-tight lg:text-4xl">
            Passionate Road Traffic Safety and Food Chama Empowerment
            </h2>
            <h2 className="md:hidden text-4xl font-bold tracking-wide">PAFCE</h2>
          </div>
          <div className="md:hidden">
            <MobileNavbar data={clusters} />
          </div>
        </div>
        <div className="flex h-[100vh] w-screen mb-5 py-6 ">
          <div className='hidden md:flex flex-col gap-y-2 h-full w-[250px] px-2 border-r-2'>
            <Sidebar data = {clusters}/>
          </div>
          <div className="flex-1 overflow-y-auto px-6 ">
            <Outlet context={clusters}/>
          </div>
        </div>
      </div>
    </>
  )
}