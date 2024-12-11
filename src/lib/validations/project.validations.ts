import * as z from "zod"
import { ProjectStatus } from "@prisma/client"

export const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required").max(255),
  description: z.string().optional(),
  status: z.nativeEnum(ProjectStatus).optional(),
  dueDate: z.string().optional(), // ISO date string
})

export const updateProjectSchema = createProjectSchema.partial()

export type CreateProjectInput = z.infer<typeof createProjectSchema>
export type UpdateProjectInput = z.infer<typeof updateProjectSchema> 