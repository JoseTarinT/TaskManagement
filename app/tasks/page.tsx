"use client";

import { apiFetch } from "@/lib/api";
import { Task, TaskStatus } from "@/lib/types";
import styles from "./page.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<TaskStatus>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks on component mount or when filter changes
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response: Task[] =
          statusFilter !== "all"
            ? await apiFetch(`/tasks?status=${statusFilter}`)
            : await apiFetch("/tasks");
        setTasks(response);
      } catch (err) {
        setError("Failed to fetch tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [statusFilter]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(
      event.target.value as "all" | "pending" | "in progress" | "completed"
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Tasks</h1>

      {/* Task Filter */}
      <div className={styles.filterContainer}>
        <label htmlFor="statusFilter">Filter by Status:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={handleFilterChange}
          className={styles.filterSelect}
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Loading, Error, and Task List */}
      {loading && <p>Loading tasks...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <ul className={styles.taskList}>
        {tasks.map((task: Task) => (
          <TaskItem key={task.id} title={task.task_name} status={task.status} />
        ))}
      </ul>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <Link href="/" className={styles.secondaryButton}>
          Back to Dashboard
        </Link>
        <Link href="/create_task" className={styles.primaryButton}>
          Create Task
        </Link>
      </div>
    </div>
  );
}

function TaskItem({
  title,
  status,
}: {
  title: string;
  status: "all" | "pending" | "in progress" | "completed";
}) {
  return (
    <li className={styles.taskItem}>
      <span>{title}</span>
      <span
        className={status === "completed" ? styles.completed : styles.pending}
      >
        {status}
      </span>
    </li>
  );
}
