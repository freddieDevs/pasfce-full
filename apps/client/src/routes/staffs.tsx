// import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Cluster, Staff } from '@/types/types';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
/**
 * APPROACHES: 
 * 1. USING OUTLET CONTEXT
 * its very fast but i have to implement a loader or try state managemnt to make the data be up to date 
 * here i have to count a staff comes from how many clusters and thats the clusterCount, reports count we have to search reports for those clusters done by each staff, members count members in each cluster created by the staff 
 * render all the staff in the system
 * its seems i have to use a loader
 * this is where you can add a new staff
 * we can also edit a staff
 * also view staff details
 * loaders are kinda slow somehow
 */
export const StaffPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const clusterData = useOutletContext() as Cluster[] | null;
  const [staffs, setStaffs] = useState<Staff[] | []>([]);

  useEffect(() => {
    
    //initialize an array to store the unique staff members
    const uniqueStaffArray = [] as Staff[];

    //iterate through the clusterData and add staff that is not in the array
    clusterData?.forEach((cluster) => {
      if (cluster?.staff && !uniqueStaffArray.some((staff) => staff.id === cluster.staff.id)) {
        //add the staff to the unique staff array
        uniqueStaffArray.push(cluster.staff);
      }
    });
    // set the staffs;
    setStaffs(uniqueStaffArray);
  }, [clusterData]);
  // console.log(staffs, 'STAFFS');
  // console.log('CLUSTERDATA', staffs);
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading 
          title='Staff Data' description='Manage Staff'
        />
        <Button 
          onClick={() => navigate(`/${params.clusterId}/staffs/new`)} 
          className="bg-cyan-700 text-accent hover:bg-cyan-800"
        >
          <Plus className='mr-2 h-4 w-4'/>
        </Button>
      </div>
      <Separator className='mt-4' />
      {/* <DataTable searchKey='' columns={} data={}/> */}
    </>
  )
}