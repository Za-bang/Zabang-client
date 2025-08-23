"use client";

import styles from "./nav.module.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
// import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton } from "@mui/material";
import {useRouter} from "next/navigation";

export default function HeaderBack() {

  const router=useRouter();
  const handleGoToSearchPage=()=>{
    router.push('/search')
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {/* <NotificationsNoneRoundedIcon fontSize="inherit" className={styles.headerIcon}/> */}
        <ArrowBackIosNewIcon fontSize="inherit" className={styles.headerIcon} onClick={() => router.back()}/>
        <img src="/logo.png" alt="logo" className={styles.logo} />
        <IconButton onClick={handleGoToSearchPage}>
        <SearchRoundedIcon fontSize="inherit" className={styles.headerIcon} />
        </IconButton>
        </div>

    </header>
  );
}
