"use client";

import Header from "../Components/Header";
import BottomNav from "../Components/BottomNav";
import type { ReviewResponse } from "@/types/propertyPost";
import { MOCK_REVIEWS } from "@/data/demoReviews";
import styles from "./page.module.css";
import { useState } from "react";
import dynamic from "next/dynamic";
import ReviewList from "./ReviewList";
import { MOCK_PROPERTY_POST, MOCK_PROPERTY_AI, MOCK_ROOM_DETAILS } from "@/data/demoProperties";
import PropertyPreview from "./map/Components/PropertyPreview";

const KMap = dynamic(
  () => import("./map/Components/KakaoMap").then((mod) => mod.KakaoMap),
  {
    ssr: false,
  }
);

export default function HomePage() {
  const [reviews] = useState<ReviewResponse[]>(MOCK_REVIEWS);

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
          <div className={styles.mapCard}>
            <KMap />
          </div>
          <div className={styles.propertyPrev}>
          {MOCK_PROPERTY_POST.map((item) => {
            const aiResult = MOCK_PROPERTY_AI.find(
              (ai) => ai.propertyId === item.propertyId
            );

            const roomDetail = MOCK_ROOM_DETAILS.find(
              (room) => room.propertyId === item.propertyId
            );

            if (!roomDetail) return null; 

            return (
              <PropertyPreview
                key={item.propertyId}
                data={roomDetail}
                reviewAI={aiResult}
              />
            );
          })}
        </div>
        </section>
      </main>

      <BottomNav active="home" />
    </div>
  );
}
