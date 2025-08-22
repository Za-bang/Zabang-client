"use client";

import Link from "next/link";
import styles from "./nav.module.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import PersonIcon from '@mui/icons-material/Person';

export default function BottomNav({ active = "home" }) {
  return (
    <nav className={styles.bottomNav} role="navigation" aria-label="하단탭">
      <div className={styles.bottomInner}>
        <Link
          href="/"
          className={`${styles.tabBtn} ${active === "home" ? styles.tabActive : ""}`}
        >
          <HomeRoundedIcon fontSize="inherit" className={styles.bottomIcon} />
        </Link>

        <Link
          href="/map"
          className={`${styles.tabBtn} ${active === "map" ? styles.tabActive : ""}`}
        >
          <MapRoundedIcon fontSize="inherit" className={styles.bottomIcon} />
        </Link>

        <Link
          href="/community"
          className={`${styles.tabBtn} ${active === "board" ? styles.tabActive : ""}`}
        >
          <ForumRoundedIcon fontSize="inherit" className={styles.bottomIcon} />
        </Link>

        <Link
          href="/mypage"
          className={`${styles.tabBtn} ${active === "mypage" ? styles.tabActive : ""}`}
        >
          <PersonIcon fontSize="inherit" className={styles.bottomIcon} />
        </Link>
      </div>
    </nav>
  );
}
