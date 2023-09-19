import { ReportForm } from "@/components/reports/report-form";
import { useUpdatedReport } from "@/hooks/use-updated-report";
import { Cluster, Report } from "@/types/types";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom"

export const ReportIdPage = () => {
  const clusterData = useOutletContext() as Cluster[] | null;
  const params = useParams();
  const { getUpdatedReport } = useUpdatedReport();
  const updatedReport = getUpdatedReport();

  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (clusterData && params.clusterId) {
      const currentCluster = clusterData.find((cluster) => cluster.id === params.clusterId);
      if (currentCluster && params.reportId) {
        const individual = (currentCluster ?? []).reports.find((report) => report.id === params.reportId) as Report;
        if (individual && typeof individual !== 'undefined') {
          if (updatedReport && updatedReport.id === individual.id) {
            setReport(updatedReport);
          } else {
            setReport(individual);
          }
        }
      }
    } else {
      setReport(null);
    }
    setLoading(false);
  }, [clusterData, params.clusterId, params.reportId, updatedReport]);

  if (loading) {
    return null;
  }
  
  return (
    <>
      <ReportForm data={report} />
    </>
  )
}