"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./account.module.css";
import { clearProfile, loadProfile } from "../_store";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

export default function AccountManagePage() {
  const router = useRouter();
  const p = loadProfile();
  const [busy, setBusy] = useState(false);

  const logout = async () => {
    if (busy) return;
    setBusy(true);
    // 실제 서비스에서는 토큰 만료/세션 종료 API 호출
    alert("로그아웃 되었습니다. (더미)");
    setBusy(false);
    router.replace("/");
  };

  const deleteAccount = async () => {
    if (busy) return;
    if (!confirm("정말 탈퇴하시겠습니까? 되돌릴 수 없습니다.")) return;
    setBusy(true);
    // 실제 서비스에선 서버 탈퇴 API 호출 후 clear
    clearProfile();
    alert("회원탈퇴 처리되었습니다. (더미)");
    setBusy(false);
    router.replace("/");
  };

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <button className={styles.iconBtn} onClick={() => router.back()} aria-label="뒤로가기">
          <ArrowBackIosNewRoundedIcon fontSize="small" />
        </button>
        <div className={styles.title}>계정관리</div>
        <div style={{ width: 36 }} />
      </div>

      <div className={styles.inner}>
        <section className={styles.card}>
          <div className={styles.sectionTitle}>계정 정보</div>
          <div className={styles.kv}>
            <span className={styles.k}>닉네임</span>
            <span className={styles.v}>{p.nickname || "—"}</span>
            <span className={styles.k}>연락처</span>
            <span className={styles.v}>{p.phone || "—"}</span>
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.sectionTitle}>세션</div>
          <div className={styles.rowBtns}>
            <button className={styles.ghostBtn} onClick={logout} disabled={busy}>
              <LogoutRoundedIcon /> 로그아웃
            </button>
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.sectionTitle}>계정 삭제</div>
          <p className={styles.note}>
            계정과 로컬 데이터가 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
          </p>
          <button className={styles.dangerBtn} onClick={deleteAccount} disabled={busy}>
            <DeleteOutlineRoundedIcon /> 회원탈퇴
          </button>
        </section>
      </div>
    </div>
  );
}
