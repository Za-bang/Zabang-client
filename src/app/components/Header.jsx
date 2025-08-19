"use client";

import { useRouter } from "next/navigation";
import styles from "./Header.module.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

/** showSearch=false 로 넘기면 돋보기 숨김 */
export default function Header({ showSearch = true }) {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <button
        className={styles.brand}
        onClick={() => router.push("/")}
        aria-label="홈으로"
        title="홈으로"
      >
        <HomeRoundedIcon fontSize="small" />
        <span className={styles.title}>ZaBang</span>
      </button>

      <div className={styles.actions}>
        {showSearch && (
          <button
            className={styles.iconBtn}
            onClick={() => router.push("/search")}
            aria-label="검색"
            title="검색"
          >
            <SearchRoundedIcon />
          </button>
        )}
      </div>
    </header>
  );
}
