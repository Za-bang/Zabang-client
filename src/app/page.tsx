"use client";

import Header from "../Components/Header";
import BottomNav from "../Components/BottomNav";
import type { Review } from "@/types/review";
import {fetchReviews} from "@/api/reviews"
import ReviewList from "./ReviewList";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const KMap = dynamic(() => import("./map/Components/KakaoMap").then(mod => mod.KakaoMap), {
  ssr: false,
});

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
          <div className={styles.mapCard} >
              <KMap />
          </div>
        </section>
      </main>

      <BottomNav active="home" />
    </div>
  );
}
