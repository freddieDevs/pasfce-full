import { Member } from "@/types/types";import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import * as z from 'zod';
import { AlertModal } from "../modals/alert-modal";
import { Heading } from "../ui/heading";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface MemberFormProps {
  data: Member | null;
}

/**
 * create different titles if there is data and if there is no data
 * have a form to render the values
 * 
 */

const formSchema = z.object({
  firstName: z.string().min(1),
})

type MemberFormValues = z.infer<typeof formSchema>;

export const MemberForm: React.FC<MemberFormProps> = ({
  data
}) => {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = data ? 'Edit Member' : 'Create a member';
  const description = data ? 'update member details' : 'register a Member';
  const toastMessage = data ? 'Member Updated' : 'Member Created';
  const action = data ? 'Save Changes' : 'Create';

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data ? data : {
      firstName: '',
    }
  })

  const onSubmit = async() => {
    try {
      setLoading(true);
      toast.success(toastMessage);
    } catch (error) {
      console.log('MEMBERFORMERROR', error);
    } finally {
      setLoading(false);
    }
  }

  const onDelete = async() => {
    try {
      setLoading(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading}/>
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-center h-screen">
          <div className="fixed z-50 grid w-full max-w-lg mx-auto border rounded-lg p-4 shadow-lg bg-amber-100 text-cyan-900">
            <Heading  title={title} description={description}/>
            <div>
              <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField control={form.control}
                    name='firstName'
                    render={({field})=> (
                      <FormItem>
                        <FormLabel>FirstName</FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder='Enter your first name' {...field} className="bg-cyan-700 text-accent"
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                    <Button type='submit' disabled={loading}
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
      </div>
    </>
  )
}