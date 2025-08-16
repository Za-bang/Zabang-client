"use client";

import styles from "../page.module.css";
import HouseRoundedIcon from "@mui/icons-material/HouseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.brand}>
          <HouseRoundedIcon style={{ color: "#6a5cff" }} />
          <span>ZaBang</span>
        </div>
        <div className={styles.headerActions}>
          <SearchRoundedIcon />
          <NotificationsNoneRoundedIcon />
        </div>
      </div>
    </header>
  );
}
