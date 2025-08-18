"use client";

import Header from "../Components/Header";
import ReviewList from "./Components/ReviewList";
import BottomNav from "../Components/BottomNav";
import styles from "./page.module.css";
import type { Review } from "@/types/review";
import {fetchReviews} from "@/api/reviews"
import { useEffect, useState } from "react";
export default function HomePage() {

    //리뷰 목록 나타내기
   const [reviews, setReviews] = useState<Review[]>([]);
   useEffect(()=>{
    fetchReviews().then(setReviews);
   }, []);
   

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
          <div className={styles.sectionTitle}>근처 방 찾기</div>
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
