"use client"

import { useRouter } from "next/navigation"
import { useApi } from "@/hooks/useApi"
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Folder, Edit } from "lucide-react"
import MotionDiv from "@/components/animations/MotionDiv"
import { TaskStatus, Priority } from "@prisma/client"
type Task = {
 id: string
 title: string
 description: string | null
 status: TaskStatus
 priority: Priority
 dueDate: string | null
 project: {
   id: string
   name: string
   members: {
     userId: string
     role: string
   }[]
 }
 assignedTo: {
   id: string
   name: string | null
   email: string
   image: string | null
 } | null
}

const statusConfig = {
 TODO: {
   label: "To Do",
   color: "text-gray-700 dark:text-gray-300",
 },
 IN_PROGRESS: {
   label: "In Progress",
   color: "text-blue-700 dark:text-blue-300",
 },
 IN_REVIEW: {
   label: "In Review",
   color: "text-yellow-700 dark:text-yellow-300",
 },
 COMPLETED: {
   label: "Completed",
   color: "text-green-700 dark:text-green-300",
 },
}

const priorityConfig = {
 LOW: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
 MEDIUM: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
 HIGH: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
 URGENT: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

export default function TaskPage({ params }: { params: { id: string; taskId: string; } }) {
 const router = useRouter()
 const { toast } = useToast()
  const { data: task, error, isLoading } = useApi<Task>(`/api/projects/${params.id}/tasks/${params.taskId}`, {
   onError: (error) => {
     toast({
       variant: "destructive",
       title: "Error loading task",
       description: "Please try again later or contact support if the problem persists.",
     })
     console.error("Error fetching task:", error)
   },
 })

  if (isLoading) {
   return (
     <div className="container mx-auto py-6">
       <Card className="p-6">
         <div className="animate-pulse space-y-4">
           <div className="h-8 w-2/3 bg-gray-200 rounded"></div>
           <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
           <div className="space-y-2">
             <div className="h-4 w-full bg-gray-200 rounded"></div>
             <div className="h-4 w-full bg-gray-200 rounded"></div>
           </div>
         </div>
       </Card>
     </div>
   )
 }
  if (error || !task) {
   return (
     <div className="container mx-auto py-6">
       <Card className="p-6">
         <p className="text-red-500">Error loading task details</p>
       </Card>
     </div>
   )
 }

  return (
   <MotionDiv
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5 }}
     className="container mx-auto py-6"
   >
     <Card className="p-6">
       <div className="flex justify-between items-start mb-6">
         <div>
           <div className="flex items-center gap-2 text-gray-500 mb-2">
             <Folder className="h-4 w-4" />
             <span>{task.project.name}</span>
           </div>
           <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
           <div className="flex items-center gap-4">
             <Badge className={priorityConfig[task.priority]}>{task.priority}</Badge>
             <span className={`font-medium ${statusConfig[task.status].color}`}>
               {statusConfig[task.status].label}
             </span>
           </div>
         </div>
         <Button
           onClick={() => router.push(`/dashboard/projects/${params.id}/tasks/${task.id}/edit`)}
           variant="outline"
           size="sm"
           className="flex items-center gap-2"
         >
           <Edit className="h-4 w-4" />
           Edit Task
         </Button>
       </div>
        <div className="space-y-6">
         <div>
           <h2 className="text-lg font-semibold mb-2">Description</h2>
           <p className="text-gray-600 dark:text-gray-300">
             {task.description || "No description provided"}
           </p>
         </div>
          <div className="flex items-center gap-6">
           {task.dueDate && (
             <div className="flex items-center gap-2">
               <Calendar className="h-5 w-5 text-gray-500" />
               <span className="text-sm text-gray-600 dark:text-gray-300">
                 Due: {new Date(task.dueDate).toLocaleDateString()}
               </span>
             </div>
           )}
         </div>
          {task.assignedTo && (
           <div>
             <h2 className="text-lg font-semibold mb-2">Assigned To</h2>
             <div className="flex items-center gap-2">
               <Avatar className="h-8 w-8">
                 <AvatarImage src={task.assignedTo.image || ''} alt={task.assignedTo.name || ''} />
                 <AvatarFallback>
                   {task.assignedTo.name?.charAt(0) || task.assignedTo.email.charAt(0)}
                 </AvatarFallback>
               </Avatar>
               <div>
                 <p className="font-medium">{task.assignedTo.name}</p>
                 <p className="text-sm text-gray-500">{task.assignedTo.email}</p>
               </div>
             </div>
           </div>
         )}
       </div>
     </Card>
   </MotionDiv>
 )

}