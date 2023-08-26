import { Logo } from "@/components/logo"
import { MobileNavbar } from "@/components/mobile-navbar"
import { Sidebar } from "@/components/sidebar"
import { Outlet } from "react-router-dom"

export const Root = () => {
  return (
    <>
      <div className=" flex ml-8 pb-4 border-b-2 justify-between md:justify-center items-center">
        <Logo />
        <div className="md:border-l border-slate-300 px-4">
          <h2 className="hidden md:block text-3xl font-bold tracking-tight lg:text-4xl">
          Passionate Road Traffic Safety and Food Chama Empowerment
          </h2>
          <h2 className="md:hidden text-4xl font-bold tracking-wide">PAFCE</h2>
        </div>
        <div className="md:hidden">
          <MobileNavbar />
        </div>
      </div>
      <div className="flex h-[100vh] w-screen mb-5 py-6">
        <div className='hidden md:flex flex-col gap-y-2 h-full w-[250px] px-2 border-r-2'>
          <Sidebar />
        </div>
        <div className="flex-1 overflow-y-auto px-6 ">
          <Outlet />
        </div>
      </div>
    </>
  )
}