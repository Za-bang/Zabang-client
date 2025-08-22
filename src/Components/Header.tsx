"use client";

import styles from "./nav.module.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
// import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import { IconButton } from "@mui/material";
import {useRouter} from "next/navigation";

export default function Header() {

  const router=useRouter();
  const handleGoToSearchPage=()=>{
    router.push('/search')
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div></div>
        {/* <NotificationsNoneRoundedIcon fontSize="inherit" className={styles.headerIcon}/> */}
        <img src="/logo.png" alt="logo" className={styles.logo} />
        <IconButton onClick={handleGoToSearchPage}>
        <SearchRoundedIcon fontSize="inherit" className={styles.headerIcon} />
        </IconButton>
        </div>

    </header>
  );
}
