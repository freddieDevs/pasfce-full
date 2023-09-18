import { DataTable } from '@/components/data-table';
import { StaffColumn, staffsColumn } from '@/components/staff/staffs-columns';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Cluster, Staff } from '@/types/types';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

/**
 * yet to create the individual staff pages
 */
export const StaffPage = () => {
  // const navigate = useNavigate();
  // const params = useParams();
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

  const formattedStaffs: StaffColumn[] = staffs.map((item) => {
    //initialize members and reports count 
    let membersCount = 0;
    let reportsCount = 0;

    // iterate through the clusterData to come up with the count
    clusterData?.forEach((cluster) => {
      //ensure there is a cluster and the staffId match
      if (cluster.staff && cluster.staff.id === item.id) {
        membersCount += cluster.members.length;
        reportsCount += cluster.reports.length;
      }
    });

    return {
      id: item.id,
      firstName: item.firstname,
      surname: item.surname,
      email: item.email,
      phoneNumber: item.phoneNumber,
      jobPosition: item.jobPosition,
      createdAt: format(new Date(item.createdAt), 'dd MMMM yyyy'),
      members: membersCount,
      reports: reportsCount,
    };
  });
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading 
          title='Staff Data' description='Manage Staff'
        />
        <Button 
          onClick={() => {}} 
          className="bg-cyan-700 text-accent hover:bg-cyan-800"
        >
          <Plus className='mr-2 h-4 w-4'/>
          Add a new Staff
        </Button>
      </div>
      <Separator className='mt-4' />
      <DataTable searchKey='surname' columns={staffsColumn} data={formattedStaffs}/>
    </>
  )
}