"use client";

import { useState } from "react";
import { apiFetch, createTask } from "@/lib/api";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { TaskStatus } from "@/lib/types";

export default function NewTaskPage() {
  const router = useRouter();
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<TaskStatus>("pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName || !description || !type || !dueDate) {
      setError("Please fill in all the fields.");
      return;
    }

    try {
      setLoading(true);
      const newTask = {
        task_name: taskName,
        task_description: description,
        task_type: type,
        due_date: dueDate,
        status,
      };
      await createTask("/tasks", newTask);
      setSuccessMessage("Task created successfully!");
      setTaskName("");
      setDescription("");
      setType("");
      setDueDate("");
      setStatus("pending");

      // Redirect after success
      setTimeout(() => router.push("/tasks"), 2000);
    } catch (err) {
      setError("Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create a New Task</h1>

      {/* Success/Error Messages */}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {error && <p className={styles.error}>{error}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="taskName">Task Name:</label>
          <input
            id="taskName"
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className={styles.textarea}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="type">Task Type:</label>
          <input
            id="type"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className={styles.textarea}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "pending" | "completed")
            }
            className={styles.select}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}
