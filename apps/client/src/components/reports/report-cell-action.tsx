import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { AlertModal } from "../modals/alert-modal";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ReportColumn } from "./reports-columns";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

interface ReportCellActionProps {
  data: ReportColumn;
}

export const ReportCellAction: React.FC<ReportCellActionProps> = ({
  data
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('report Id copied successfully');
  }

  const onDelete = async() => {
    try {
      setLoading(true);
      // await axios.delete(`/api/${params.storeid}/categories/${data.id}`);
      toast.success("Report Deleted");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }
  const isReportFromCluster = data.clusterId === params.clusterId
  return (
    <>
      <AlertModal 
        isOpen={open}
        loading={loading}
        onClose={()=> setOpen(false)}
        onConfirm={onDelete}
      />
        {isReportFromCluster && (<DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-cyan-700 text-accent">
            <DropdownMenuLabel>
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={()=> onCopy(data.id)}>
              <Copy className="mr-2 h-4 w-4"/>
              Copy Id
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=> navigate(`/${params.clusterId}/reports/${data.id}`)}>
              <Edit className="mr-2 h-4 w-4"/>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=> setOpen(true)}>
              <Trash className="mr-2 h-4 w-4"/>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>)}
    </>
  )
}