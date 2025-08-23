"use client";

import Header from "../Components/Header";
import BottomNav from "../Components/BottomNav";
import type { propertyReview } from "@/types/propertyReview";
import { MOCK_REVIEWS } from "@/data/demoReviews";
import styles from "./page.module.css";
import { useState } from "react";
import dynamic from "next/dynamic";
import ReviewList from "./ReviewList";
import { MOCK_PROPERTY_POST } from "@/data/demoProperties";
import PropertyPreview from "./map/Components/PropertyPreview";

const KMap = dynamic(
  () => import("./map/Components/KakaoMap").then((mod) => mod.KakaoMap),
  {
    ssr: false,
  }
);

export default function HomePage() {
  const [reviews] = useState<propertyReview[]>(MOCK_REVIEWS);

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
          {MOCK_PROPERTY_POST.map((item) => (
            <PropertyPreview key={item.propertyId} data={item} />
          ))}
        </div>
        </section>
      </main>

      <BottomNav active="home" />
    </div>
  );
}
