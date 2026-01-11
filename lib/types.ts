export type TaskStatus = "all" | "pending" | "in progress" | "completed";

export interface Task {
  id: number;
  task_name: string;
  task_description: string | null;
  task_type: string;
  due_date: string; // ISO date: YYYY-MM-DD
  status: TaskStatus;
}

export interface CreateTaskPayload {
  task_name: string;
  task_description?: string;
  task_type: string;
  due_date: string;
  status?: TaskStatus;
}

export type UpdateTaskPayload = CreateTaskPayload;
