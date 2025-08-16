"use client";

import Link from "next/link";
import styles from "../page.module.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

export default function BottomNav({ active = "home" }) {
  return (
    <nav className={styles.bottomNav} role="navigation" aria-label="하단탭">
      <div className={styles.bottomInner}>
        <Link
          href="/"
          className={`${styles.tabBtn} ${active === "home" ? styles.tabActive : ""}`}
        >
          <HomeRoundedIcon fontSize="small" />
          <span>홈</span>
        </Link>

        <Link
          href="/map"
          className={`${styles.tabBtn} ${active === "map" ? styles.tabActive : ""}`}
        >
          <MapRoundedIcon fontSize="small" />
          <span>지도</span>
        </Link>

        <Link
          href="/community"
          className={`${styles.tabBtn} ${active === "board" ? styles.tabActive : ""}`}
        >
          <ForumRoundedIcon fontSize="small" />
          <span>게시판</span>
        </Link>

        <Link
          href="/settings"
          className={`${styles.tabBtn} ${active === "settings" ? styles.tabActive : ""}`}
        >
          <SettingsRoundedIcon fontSize="small" />
          <span>설정</span>
        </Link>
      </div>
    </nav>
  );
}
