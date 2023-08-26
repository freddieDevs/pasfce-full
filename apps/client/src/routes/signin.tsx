
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from 'zod'

const formSchema = z.object({
  // how you schema will look like
  name: z.string().min(1).max(15),
  email: z.string().min(5),
  username: z.string().min(1).max(15),
  password: z.string().min(1),
  confirmPassword: z.string().min(1),
})

export const SigninPage = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // to prevent undefined
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    }

  });
  
  const onSubmit = () => {
    // TODO sign in or up with the backend
    //setting accesstoken as authToken
    //redirect to clusters page
    setLoading(true);
  }
  return (
    
  <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
    <div className="flex items-center justify-center h-screen">
    <div className="fixed z-50 grid w-full max-w-lg mx-auto border rounded-lg p-4 shadow-lg ">
      <Tabs defaultValue="signin">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign in</TabsTrigger>
          <TabsTrigger value="signup">Sign up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
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
                          <Input disabled={loading} placeholder='Enter your username' {...field}/>
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
                          <Input disabled={loading} placeholder='Enter your password' {...field}/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                    <Button type='submit' disabled={loading}>
                      Sign in
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="signup">
          <div>
            <div className='space-y-4 py-2 pb-4'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField control={form.control}
                    name='name'
                    render={({field})=> (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder='Enter your name' {...field}/>
                        </FormControl>
                        <FormMessage/>  
                      </FormItem>
                    )}
                  />
                  <FormField control={form.control}
                    name='email'
                    render={({field})=> (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder='Enter your email address' {...field}/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField control={form.control}
                    name='username'
                    render={({field})=> (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder='Enter your username' {...field}/>
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
                          <Input disabled={loading} placeholder='Enter a password' {...field}/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField control={form.control}
                    name='confirmPassword'
                    render={({field})=> (
                      <FormItem>
                        <FormLabel>Confirm your password</FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder='make sure that your passwords match' {...field}/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                
                  <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                    <Button type='submit' disabled={loading}>
                      Sign up
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </div>
  </div>
 
  )
}
