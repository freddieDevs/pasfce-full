
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as z from 'zod'
import { toast } from 'react-hot-toast'

const formSchema = z.object({
  // how you schema will look like
  // name: z.string().min(1).max(15),
  // email: z.string().min(5),
  username: z.string().min(1).max(15),
  password: z.string().min(1),
  // confirmPassword: z.string().min(1),
})

export const SigninPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // to prevent undefined
      // name: "",
      // email: "",
      username: "",
      password: "",
      // confirmPassword: "",
    }

  });
  
  const onSubmit = async(data: { username: string; password: string }) => {
    // TODO sign in or up with the backend
    try {
      setLoading(true);
      const response = await axios.post('/api/management/signin', data);
      //setting accesstoken as authToken
      const authResponse: { accessToken: string } = response.data;
      localStorage.setItem('authToken', authResponse.accessToken); 
      //redirect to clusters page
      navigate('/');
    } catch (error) {
      toast.error('invalid credentials')
      console.error('AUTHERROR', error);
    } finally {
      setLoading(false);
    }
  }
  return (
    
  <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
    <div className="flex items-center justify-center h-screen">
    <div className="fixed z-50 grid w-full max-w-lg mx-auto border rounded-lg p-4 shadow-lg bg-amber-100 text-cyan-900">
      <h1 className="text-center text-2xl font-bold">Sign in</h1>
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField control={form.control}
                name='username'
                render={({field})=> (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder='Enter your username' {...field} className="bg-cyan-700 text-accent"
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField control={form.control}
                name='password'
                render={({field})=> (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder='Enter your password' {...field} type="password" className="bg-cyan-700 text-accent"/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                <Button type='submit' disabled={loading}
                  className="bg-cyan-700 text-accent hover:bg-cyan-800"
                >
                  Sign in
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
    </div>
  </div>
 
  )
}
