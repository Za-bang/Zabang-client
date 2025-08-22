"use client";

import styles from "./page.module.css";
import Header from "@/Components/Header";
import BottomNav from "@/Components/BottomNav";
import { useState, useEffect } from "react";
import DeleteAccount from "./Components/DeleteAccount";
import { useRouter } from "next/navigation";
// import { UserApi } from "@/generated";

export default function Mypage() {
  const [user, setUser] = useState<{ id: string; nickname: string }>({
    id: "",
    nickname: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 실제 연결 시
        // const api = new UserApi();
        // const res = await api.getUserMe();
        // setUser({ id: res.id, nickname: res.nickname });

        // 임시 더미 데이터
        setUser({ id: "qwerty", nickname: "홍길동" });
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const { push } = useRouter();
  const handleGoToChangePW = () => {
    push('./changepw');
  };

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.main}>
        <section className={styles.card}>
          <div className={styles.cardTitle}>계정</div>

          <div className={styles.formCol}>
            <div className={styles.field}>
              <label className={styles.label}>아이디</label>
              <span className={styles.text}>{user.id}</span>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>닉네임</label>
              <span className={styles.text}>{user.nickname}</span>
            </div>
          </div>
        </section>

        {/* 기타 */}
        <section className={styles.card}>
          <div className={styles.cardTitle}>기타</div>

          <div className={styles.listRow}>
            <span>앱 버전</span>
            <span className={styles.muted}>1.01</span>
          </div>
        </section>
        <div className={styles.btn}>
          <button className={styles.changePWbtn} onClick={handleGoToChangePW}>
            비밀번호 변경하기
          </button>
          <div className={styles.deleteAccBtn}>
            <DeleteAccount />
          </div>
        </div>
      </div>

      <BottomNav active="mypage" />
    </div>
  );
}
