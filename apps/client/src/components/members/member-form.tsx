import { Member, RewardLevel } from "@/types/types";import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as z from 'zod';
import { AlertModal } from "../modals/alert-modal";
import { Heading } from "../ui/heading";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Status } from '@/types/types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import axios from "axios";
import { requireAuth } from "@/lib/require-auth";
import { useUpdatedMember } from "@/hooks/use-updated-member";

interface MemberFormProps {
  data: Member | null;
}

/**
 * create different titles if there is data and if there is no data
 * have a form to render the values
 * submission: there are 2 cases post or patch
 * let response and use it for errors
 */

const formSchema = z.object({
  firstName: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().min(1),
  gender: z.string().min(1),
  idNumber: z.string().min(4),
  phoneNumber: z.string().min(10).max(10),
  memberStatus: z.nativeEnum(Status),
  rewardStatus: z.nativeEnum(RewardLevel),
})

type MemberFormValues = z.infer<typeof formSchema>;

export const MemberForm: React.FC<MemberFormProps> = ({
  data
}) => {
  const navigate = useNavigate();
  const params = useParams();
  const { setUpdatedMember } = useUpdatedMember();

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
      surname: '',
      email: '',
      gender: '',
      idNumber: '',
      phoneNumber: '',
      memberStatus: Status.JOINED,
      rewardStatus: RewardLevel.BEGINNER,
    }
  })

  

  const onSubmit = async(values: MemberFormValues) => {

    const formattedValues = {
      ...values,
      phoneNumber: values.phoneNumber.toString(),
      idNumber: values.idNumber.toString(),
    }
   
    try {
      setLoading(true);
      let response ;
      const config = await requireAuth();
      if(data) {
        response = await axios.patch(`/api/members/${params.memberId}`, formattedValues, config)
      } else {
        response = await axios.post(`/api/members?clusterId=${params.clusterId}`, formattedValues, config)
      }
      if (response.status === 200 || response.status === 201) {
        toast.success(toastMessage);
        setUpdatedMember(response.data);
        navigate(`/${params.clusterId}/members`);
      } else if (response.status === 401) {
        navigate('/signin')
      } else {
        toast.error('Something Went Wrong!')
      }
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

  const onPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    form.setValue('phoneNumber', numericValue);
  }
  
  const onIdNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    form.setValue('idNumber', numericValue);
  }
  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading}/>
      <div className="absolute inset-0 z-10 -bottom-40  bg-background/80 backdrop-blur-sm pt-24">
        <div className="flex items-center justify-center h-screen">
          <div className=" w-full max-w-lg mx-auto border rounded-lg p-8 shadow-lg bg-amber-100 text-cyan-900 overflow-y-auto ">
            <div className="space-y-4 py-2">
              <Heading  title={title} description={description}/>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control}
                  name='firstName'
                  render={({field})=> (
                    <FormItem>
                      <FormLabel>FirstName</FormLabel>
                      <FormControl>
                        <Input disabled={loading || (data !== null)} placeholder='Enter your first name' {...field} className="bg-cyan-700 text-accent"
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField control={form.control}
                  name='surname'
                  render={({field})=> (
                    <FormItem>
                      <FormLabel>Surname</FormLabel>
                      <FormControl>
                        <Input disabled={loading || (data !== null)} placeholder='Enter your surname' {...field} className="bg-cyan-700 text-accent"
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField control={form.control}
                  name='email'
                  render={({field})=> (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder='Enter your email address' {...field} className="bg-cyan-700 text-accent"
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField control={form.control}
                  name='gender'
                  render={({field})=> (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select disabled={loading || (data !== null)} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-cyan-700 text-accent">
                            <SelectValue placeholder='male or female' {...field}  defaultValue={field.value}
                            className="text-accent"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-cyan-700 text-accent">
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField control={form.control}
                  name='idNumber'
                  render={({field})=> (
                    <FormItem>
                      <FormLabel>ID Number</FormLabel>
                      <FormControl>
                        <Input disabled={loading || (data !== null)} placeholder='Enter your ID number' {...field} className="bg-cyan-700 text-accent"
                        onChange={onIdNumberChange}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField control={form.control}
                  name='phoneNumber'
                  render={({field})=> (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder='Enter your phone number' {...field} className="bg-cyan-700 text-accent"
                        onChange={onPhoneNumberChange}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
               
                {data && (
                  <>
                    <FormField control={form.control}
                      name='memberStatus'
                      render={({field})=> (
                        <FormItem>
                          <FormLabel>Member Status </FormLabel>
                          <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-cyan-700 text-accent">
                                <SelectValue placeholder='update Member Status' {...field}  defaultValue={field.value}
                                className="text-accent"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-cyan-700 text-accent">
                              {Object.values(Status).map((stat) => (
                                <SelectItem
                                  key={stat} value={stat}
                                >{stat}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                    <FormField control={form.control}
                      name='rewardStatus'
                      render={({field})=> (
                        <FormItem>
                          <FormLabel>Reward Level </FormLabel>
                          <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-cyan-700 text-accent">
                                <SelectValue placeholder='update reward level' {...field}  defaultValue={field.value}
                                className="text-accent"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-cyan-700 text-accent">
                              {Object.values(RewardLevel).map((level) => (
                                <SelectItem
                                  key={level} value={level}
                                >{level}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                  </>
                )}
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
    </>
  )
}