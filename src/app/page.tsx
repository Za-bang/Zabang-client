"use client";

import Header from "./components/Header";
import ReviewList from "./components/ReviewList";
import BottomNav from "./components/BottomNav";
import styles from "./page.module.css";

export default function HomePage() {
  // TODO: 이후 백엔드 연동 시 이 부분을 fetch로 교체하세요.
  const reviews = [
    {
      id: 1,
      place: "장원빌",
      text: "깨끗하고 조용한 편입니다.",
      date: "2025. 05. 23",
      likes: 2,
      comments: 2,
    },
    {
      id: 2,
      place: "장원빌",
      text: "깨끗하고 조용한 편입니다.",
      date: "2025. 05. 23",
      likes: 2,
      comments: 2,
    },
    {
      id: 3,
      place: "장원빌",
      text: "깨끗하고 조용한 편입니다.",
      date: "2025. 05. 23",
      likes: 2,
      comments: 2,
    },
  ];

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        {/* 최근 리뷰 */}
        <section className={styles.section}>
          <div className={styles.sectionTitle}>최근 리뷰</div>
          <ReviewList items={reviews} />
        </section>

        {/* 근처 방 찾기 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>근처 방 찾기</h2>
          <div className={styles.mapCard} aria-label="지도 영역">
            <div className={styles.mapPlaceholder}>
              지도 영역 (추후 지도 라이브러리 연동)
            </div>
          </div>
        </section>
      </main>

      <BottomNav active="home" />
    </div>
  );
}
