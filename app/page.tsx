import styles from "./page.module.css";

export default function LandingPage() {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo}>TaskFlow</h1>
      </header>

      <section className={styles.hero}>
        <h2 className={styles.title}>Manage your tasks with clarity</h2>

        <p className={styles.subtitle}>
          A lightweight task management system powered by microservices. Simple,
          fast, and focused.
        </p>

        <a href="/dashboard" className={styles.cta}>
          Go to Dashboard
        </a>
      </section>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} TaskFlow
      </footer>
    </main>
  );
}
