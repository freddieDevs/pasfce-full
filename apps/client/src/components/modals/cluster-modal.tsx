import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod'
import { Modal } from '@/components/ui/modal';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { useClusterModal } from '@/hooks/use-cluster';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const formSchema = z.object({
  name: z.string().min(1),
  county: z.string().min(1),
})

export const ClusterModal = () => {
  const clusterModal = useClusterModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      county: '',
    }
  });

  const onSubmit = async(data: { name: string; county: string;}) => {
    try {
      setLoading(true);
      await axios.post('/api/clusters', data);
      toast.success('Cluster created successfully');
    } catch (error) {
      console.log('CLUSTERMODAL', error);
    } finally {
      setLoading(false);
      clusterModal.onClose
    }
  }

  return (
    <Modal 
      title='Create Cluster'
      description='Add a new Cluster to your organisation'
      isOpen= {clusterModal.isOpen}
      onClose={clusterModal.onClose}
    >
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-cyan-800'>Name of Cluster</FormLabel>
                    <FormControl>
                      <Input 
                        disabled={loading}
                        placeholder='Enter name for new cluster'
                        { ...field }
                        className='bg-cyan-800 text-accent'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='county'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-cyan-800'>County</FormLabel>
                    <FormControl>
                      <Input 
                        disabled={loading}
                        placeholder='Enter county to which cluster will belong'
                        { ...field }
                        className='bg-cyan-800 text-accent'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                <Button
                  disabled={loading}
                  variant='outline'
                  onClick={clusterModal.onClose}
                  className='text-cyan-700 bg-slate-100'
                >Cancel</Button>
                <Button type='submit' disabled={loading} className='bg-cyan-800 text-accent'>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  )
}