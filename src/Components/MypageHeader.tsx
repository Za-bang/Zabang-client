"use client";

import styles from "./nav.module.css";

export default function MypageHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div></div>
        <img src="/logo.png" alt="logo" className={styles.logo} />
        <div></div>
        </div>

    </header>
  );
}
