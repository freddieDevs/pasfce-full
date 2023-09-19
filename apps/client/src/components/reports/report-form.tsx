import { requireAuth } from "@/lib/require-auth";
import { Report } from "@/types/types"
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as z from 'zod'
import { AlertModal } from "../modals/alert-modal";
import { Heading } from "../ui/heading";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUpdatedReport } from "@/hooks/use-updated-report";

interface ReportFormProps {
  data: Report | null;
}

const formSchema = z.object({
  newMembers: z.string().min(1),
  clusterTotal: z.string().min(1),
  inAttendance: z.string().min(1),
})

type ReportFormValues = z.infer<typeof formSchema>

export const ReportForm: React.FC<ReportFormProps> = ({
  data
}) => {
  const navigate = useNavigate();
  const params = useParams();
  const { setUpdatedReport } = useUpdatedReport();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = data ? 'Edit Report' : 'Create a Report';
  const description = data ? 'update Report details' : 'register a Report';
  const toastMessage = data ? 'Report Updated' : 'Report Created';
  const action = data ? 'Save Changes' : 'Create'; 

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data ? data : {
      newMembers: '',
      clusterTotal: '',
      inAttendance: '',
    }
  })

  const onSubmit = async(values: ReportFormValues) => {
    const formattedValues = {
      ...values,
      newMembers: values.newMembers.toString(),
      clusterTotal: values.clusterTotal.toString(),
      inAttendance: values.inAttendance.toString(),
    }

    try {
      setLoading(true);
      let response ;
      const config = await requireAuth();
      if(data) {
        response = await axios.patch(`/api/reports/${params.reportId}`, formattedValues, config)
      } else {
        response = await axios.post(`/api/reports?clusterId=${params.clusterId}`, formattedValues, config)
      }
      if (response.status === 200 || response.status === 201) {
        const updatedReport = response.data;
        setUpdatedReport(updatedReport);
        toast.success(toastMessage);
        // window.location.href = `/${params.clusterId}/reports`;
        navigate(`/${params.clusterId}/reports`, { state: {updatedReport} });
      } else if (response.status === 401) {
        navigate('/signin')
      } else {
        toast.error('Something Went Wrong!')
      }
    } catch (error) {
      console.log('REPORTFORMERROR', error);

    } finally {
      setLoading(false);
    }
  }

  const onDelete = async() => {
    //not yet finished
    try {
      setLoading(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const onClusterTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    form.setValue('clusterTotal', numericValue);
  }

  const onNewMembersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    form.setValue('newMembers', numericValue);
  }

  const onInAttendanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    form.setValue('inAttendance', numericValue);
  }
  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading}/>
      <div className="absolute inset-0 z-10 -bottom-40 bg-background/80 backdrop-blur-sm pt-24">
        <div className="flex items-center justify-center h-screen">
          <div className="w-full max-w-lg mx-auto border rounded-lg p-8 shadow-lg bg-amber-100 text-cyan-900 overflow-y-auto">
            <div className="space-y-4 py-2">
              <Heading title={title} description={description}/>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField 
                    control={form.control}
                    name='clusterTotal'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cluster Total</FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder="Enter cluster Total" {...field} className="bg-cyan-700 text-accent"
                          onChange={onClusterTotalChange}
                        />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField 
                    control={form.control}
                    name='inAttendance'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>In Attendance</FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder="Enter number of attendees" {...field} className="bg-cyan-700 text-accent"
                          onChange={onInAttendanceChange}
                        />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField 
                    control={form.control}
                    name='newMembers'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Members</FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder="Enter number of new members" {...field} className="bg-cyan-700 text-accent"
                          onChange={onNewMembersChange}
                        />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button type="submit" disabled={loading}
                      className="bg-cyan-700 text-accent hover:bg-cyan-800"
                    >
                      {action}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}