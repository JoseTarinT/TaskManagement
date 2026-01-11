import { Task, CreateTaskPayload, UpdateTaskPayload } from "./types";

const API_URL = process.env.NEXT_PUBLIC_TASKS_API_URL;

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  console.log("🚀 ~ apiFetch ~ endpoint:", `${API_URL}${endpoint}`);
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    throw await res.json();
  }

  return res.json();
}

export async function createTask(
  endpoint: string,
  payload: CreateTaskPayload
): Promise<{ data: Task }> {
  return apiFetch(endpoint, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateTask(
  id: number,
  payload: CreateTaskPayload
): Promise<{ data: Task }> {
  return apiFetch(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteTask(id: number) {
  return apiFetch(`/tasks/${id}`, {
    method: "DELETE",
  });
}
