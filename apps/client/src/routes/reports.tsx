import { DataTable } from "@/components/data-table";
import { ReportColumn, reportsColumn } from "@/components/reports/reports-columns";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Cluster, Report } from "@/types/types";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom"

/**
 * render reports from all clusters
 * protect changing reports by the one who created it 
 * use outletContext as its faster 
 * TODO: remember to implement redux or see what we can so to prevent the use of window.location.href 
 * there shall also be an individual reports page for writing and editing reports
 */
export const ReportsPage = () => {

  const navigate = useNavigate();
  const params = useParams();

  const clusterData = useOutletContext() as Cluster[] | null;
  const [reports, setReports] = useState<Report[] | []>([]);

  useEffect(() => {
    /**
     * i need the reports all of them from each cluster 
     * a cluster can have more than one report
     * fields for the formatted reports: the normal reports field 
     * plus the writer who is the owner of the cluster, the cluster name, county the cluster belongs to 
     * 
     */
    const allReports = [] as Report[];

    clusterData?.forEach((cluster) => {
      // check if there are reports
      if (cluster?.reports) {
        //add all reports from this cluster to all reports
        allReports.push(... cluster.reports);
      }
    });
    setReports(allReports);
  }, [clusterData]);
  // console.log('CLUSTERDATA', clusterData);
  // console.log('REPORTS', reports);

  const formattedReports: ReportColumn[] = reports.map((report) => {
    let writtenBy;
    let clusterName;
    let  countyName;
    // get name of cluster, county, and the owner of cluster 
    // find the cluster associated with the report
    const cluster = clusterData?.find((cluster) => cluster.reports?.some((r) => r.id === report.id));

    // set the values based on the found cluster
    if (cluster) {
      writtenBy = cluster.staff?.surname;
      clusterName = cluster?.name;
      countyName = cluster?.county;
    }
    
    return {
      id: report.id,
      createdAt: format(new Date(report.createdAt), 'dd MMMM yyyy'),
      newMembers: report.newMembers,
      inAttendance: report.inAttendance,
      writtenBy,
      countyName,
      clusterName,
    };
  });
  // console.log('FORMATTEDREPORTS', formattedReports);
  return (
    <>
       <div className='flex items-center justify-between'>
        <Heading 
          title='Reports Data' description='Manage Reports'
        />
        <Button 
          onClick={() => navigate(`/${params.clusterId}/reports/new`)} 
          className="bg-cyan-700 text-accent hover:bg-cyan-800"
        >
          <Plus className='mr-2 h-4 w-4'/>
          Add a new Report
        </Button>
      </div>
      <Separator className='mt-4' />
      <DataTable searchKey='writtenBy' columns={reportsColumn} data={formattedReports}/>
    </>
  )
}