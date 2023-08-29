import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "@/routes/root";
import ErrorPage from "@/error-page";
import { DashboardPage } from "@/routes/dashboard";
import { MembersPage } from "@/routes/members";
import { StaffPage } from "@/routes/staffs";
import { NewMembersPage } from "@/routes/new-members";
import { SavingsPage } from "@/routes/savings";
import { SigninPage } from "@/routes/signin";
import { ModalProvider } from "@/providers/modal-provider";
import { ClusterPage } from "./routes/cluster-page";
import { clustersLoader } from "./lib/loaders";

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <ClusterPage />, 
      loader: clustersLoader,
    },
    {
      path: "/:clusterId",
      element: <Root />,
      errorElement: <ErrorPage />,
      loader: clustersLoader,
      children: [
        {
          index: true,
          element: <DashboardPage />
        },
        {
          path: '/:clusterId/members',
          element: <MembersPage />
         
        },
        {
          path: '/:clusterId/staffs',
          element: <StaffPage />
        },
        {
          path: '/:clusterId/newmembers',
          element: <NewMembersPage />
        },
        {
          path: '/:clusterId/savings',
          element: <SavingsPage />
        },

       
      ]
    },
    {
      path: '/signin',
      element: <SigninPage />
    },
    {
      path: '*',
      element: <ErrorPage />
    }
  ]);
  return (
    
    <>
      <ModalProvider />
      <RouterProvider router={router}/>
    </>
  )
}

export default App
