"use client";

import styles from "./page.module.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <NotificationsNoneRoundedIcon fontSize="inherit" className={styles.headerIcon}/>
        <img src="/logo.png" alt="logo" className={styles.logo} />
        <SearchRoundedIcon fontSize="inherit" className={styles.headerIcon}/>
        </div>

    </header>
  );
}