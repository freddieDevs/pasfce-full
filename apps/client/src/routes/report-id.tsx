import { ReportForm } from "@/components/reports/report-form";
import { Cluster, Report } from "@/types/types";
import { useEffect, useState } from "react";
import { useLocation, useOutletContext, useParams } from "react-router-dom"

export const ReportIdPage = () => {
  const clusterData = useOutletContext() as Cluster[] | null;
  const params = useParams();
  const location = useLocation();
  const state = location.state;
  console.log(state);
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (clusterData && params.clusterId) {
      const currentCluster = clusterData.find((cluster) => cluster.id === params.clusterId);
      if (currentCluster && params.reportId) {
        const individual = (currentCluster ?? []).reports.find((report) => report.id === params.reportId) as Report;
        if (individual && typeof individual !== 'undefined') {
          setReport(individual);
        }
      }
    } else {
      setReport(null);
    }
    setLoading(false);
  }, [clusterData, params.clusterId, params.reportId])

  if (loading) {
    return null;
  }
  // console.log('REPORT', report);
  return (
    <>
      <ReportForm data={report} />
    </>
  )
}