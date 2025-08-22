"use client";
import styles from "./page.module.css";
import MypageHeader from "@/Components/MypageHeader";
import BottomNav from "@/Components/BottomNav";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePW() {
  const [currentPW, setCurrentPW] = useState("");
  const [newPW, setNewPW] = useState("");

  const handleChangePW = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPW || !newPW) {
      alert("모든 칸을 입력해주세요.");
      return;
    }
    if (currentPW === newPW) {
      alert("현재 비밀번호와 새 비밀번호가 같습니다.");
      return;
    }
    alert("비밀번호가 변경되었습니다.");
    setCurrentPW("");
    setNewPW("");
  };

  const router = useRouter();
  const handleGoToMyPage = () => {
    router.push("../");
  };

  return (
    <div className={styles.page}>
      <MypageHeader />
      <div className={styles.main}>
        <h2 className={styles.title}>비밀번호 변경</h2>

        <form onSubmit={handleChangePW} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>현재 비밀번호</label>
            <input
              type="password"
              className={styles.input}
              value={currentPW}
              onChange={(e) => setCurrentPW(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>새 비밀번호</label>
            <input
              type="password"
              className={styles.input}
              value={newPW}
              onChange={(e) => setNewPW(e.target.value)}
            />
          </div>
          <div className={styles.btnGroup}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={handleGoToMyPage}
            >
              취소
            </button>
            <button type="submit" className={styles.submitBtn}>
              변경하기
            </button>
          </div>
        </form>
      </div>
      <BottomNav active="mypage" />
    </div>
  );
}
