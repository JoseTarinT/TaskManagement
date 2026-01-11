import { apiFetch } from "@/lib/api";
import { Task } from "@/lib/types";
import styles from "./page.module.css";
import Link from "next/link";

export default async function DashboardPage() {
  const response: Task[] = await apiFetch("/tasks");
  console.log("🚀 ~ DashboardPage ~ response:", response);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>

      {/* Stats */}
      <div className={styles.statsContainer}>
        <StatCard title="Total Tasks" value={response.length} />
        <StatCard
          title="Completed"
          value={response.filter((t) => t.status === "completed").length}
        />
        <StatCard
          title="Pending"
          value={response.filter((t) => t.status === "pending").length}
        />
      </div>

      {/* Recent Tasks */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Recent Tasks</h2>

        <ul className={styles.taskList}>
          {response.map((task: Task) => (
            <li key={task.id} className={styles.item}>
              {task.task_name}
              <span>{task.status}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Actions */}
      <div className={styles.actions}>
        <Link href="/tasks" className={styles.secondaryButton}>
          View All Tasks
        </Link>

        <Link href="/create_task" className={styles.primaryButton}>
          Create Task
        </Link>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className={styles.statCard}>
      <p className={styles.statTitle}>{title}</p>
      <p className={styles.statValue}>{value}</p>
    </div>
  );
}

function TaskItem({
  title,
  status,
}: {
  title: string;
  status: "pending" | "completed";
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
