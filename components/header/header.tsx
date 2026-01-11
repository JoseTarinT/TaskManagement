"use client";
import Link from "next/link";
import styles from "./header.module.css";
// import { ThemeToggle } from "./themeToggle";
// import JTLogo from "../../public/JTLogo";
import { useEffect, useState } from "react";

const menuItems = [
  // { label: "About", path: "/about" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Tasks", path: "/tasks" },
  { label: "New Task", path: "/create_task" },
];

const Header = () => {
  const [scrollY, setScrollY] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrollY(true);
      } else {
        setScrollY(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.menu} ${scrollY ? styles.scrolled : ""}`}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <div>
            TaskFlow
            {/* <JTLogo /> */}
          </div>
        </Link>
      </div>
      <button
        className={
          menuOpen ? `${styles.burgerOpen} ${styles.burger}` : styles.burger
        }
        onClick={toggleMenu}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={`${styles.navigation} ${menuOpen ? styles.open : ""}`}>
        <ul className={styles.menuOptions}>
          {menuItems.map((item) => (
            <li key={item.label} onClick={() => setMenuOpen(false)}>
              <Link href={item.path} className={styles.menuButtons}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* <div>
        <ThemeToggle />
      </div> */}
    </header>
  );
};

export default Header;
