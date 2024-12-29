import { ProjectStatus, ProjectRole, TaskStatus, Priority } from "@prisma/client";

export type User = {
  id: string;
  name: string | null;
  email: string;
  emailVerified: boolean | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  projects?: ProjectMembership[];
  ownedProjects?: Project[];
  assignedTasks?: Task[];
};

export type ProjectMembership = {
  project: {
    id: string;
    name: string;
    status: ProjectStatus;
  };
  role: ProjectRole;
};

// You might already have these types, but if not, here they are for reference:
export type Project = {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  owner: User;
  members: ProjectMembership[];
  tasks?: Task[];
};

export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: Priority;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
  assignedToId: string | null;
  assignedTo?: User;
};