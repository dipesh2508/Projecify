import { TaskStatus, Priority, ProjectStatus } from "@prisma/client";

export type ProjectMember = {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
  role: string;
};

export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: Priority;
  dueDate: Date | null;
  assignedToId: string;
};

export type Project = {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date | null;
  tasks: Task[];
  members: ProjectMember[];
};
