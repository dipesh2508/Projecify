"use client"

import { useRouter } from "next/navigation"
import { useApi } from "@/hooks/useApi"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import MotionDiv from "@/components/animations/MotionDiv"
import { useState, useEffect } from "react"
import { LoadingButton } from "@/components/shared/LoadingButton"
import { Skeleton } from "@/components/ui/skeleton"

const formSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  status: z.enum(["IN_PROGRESS", "COMPLETED", "ON_HOLD"]),
  dueDate: z.string().optional(),
})

type TProject = {
    id: string;
    name: string;
    description: string | null;
    status: "IN_PROGRESS" | "COMPLETED" | "ON_HOLD";
    dueDate: string | null;
    ownerId: string;
    owner: {
      id: string;
      name: string;
      email: string;
      image: string | null;
    };
    members: Array<{
      user: {
        id: string;
        name: string;
        email: string;
        image: string | null;
      };
    }>;
  }

export default function EditProjectPage({ params }: { params: { id: string }}) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "IN_PROGRESS",
      dueDate: "",
    },
  })

  // Fetch project data
  const { data: project, isLoading: isLoadingProject } = useApi<TProject>(`/api/projects/${params.id}`, {
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
      router.push('/dashboard/projects')
    }
  })

  // Update form when project data is loaded
  useEffect(() => {
    if (project) {
      form.reset({
        name: project.name,
        description: project.description || "",
        status: project.status,
        dueDate: project.dueDate ? new Date(project.dueDate).toISOString().split('T')[0] : "",
      })
    }
  }, [project, form])


const { mutate, isLoading } = useApi(`/api/projects/${params.id}`, {
    method: 'PUT',
    enabled: false,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Project updated successfully",
        className: "bg-green-100 dark:bg-slate-950 border-green-600 dark:border-green-800",
      })
      router.push(`/dashboard/projects/${params.id}`)
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
      setIsSubmitting(false)
    }
  })
  

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isSubmitting) return
    setIsSubmitting(true)
    try {
      await mutate({ body: values })
    } catch (error) {
      console.error('Error updating project:', error)
      setIsSubmitting(false)
    }
  }

  // Replace the loading spinner with this skeleton
  if (isLoadingProject) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="p-6 border rounded-lg space-y-6">
          {/* Title skeleton */}
          <Skeleton className="h-8 w-48" />
          
          {/* Form field skeletons */}
          <div className="space-y-6">
            {/* Project Name field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            
            {/* Description field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-24 w-full" />
            </div>
            
            {/* Status field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            
            {/* Due Date field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            
            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>
    )
  }

// ... previous code remains the same ...

return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter project name" 
                      {...field} 
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter project description" 
                      className="resize-none" 
                      {...field} 
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="ON_HOLD">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      {...field} 
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500"
                isLoading={isLoading}
                loadingText="Updating..."
              >
                Update Project
              </LoadingButton>
            </div>
          </form>
        </Form>
      </Card>
    </MotionDiv>
  )
}