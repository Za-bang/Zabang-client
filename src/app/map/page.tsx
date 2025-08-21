"use client";
import styles from "./page.module.css";
import BottomNav from "@/Components/BottomNav";
import Header from "@/Components/Header";
import PropertyPreview from "./Components/PropertyPreview";
import type { PropertyPre } from "@/types/PropertyPreview";
import { KakaoMap } from "./Components/KakaoMap";

const demo: PropertyPre = {
  id: "1",
  name: "장원빌",
  thumbnail: "/no-image.png",
  deposit: { value: 2000000, formatted: "200만원" },
  yearlyRent: { value: 5100000, formatted: "510만원" },
  description: "복도에 정수기가 있습니다. 채광이 좋고 깨끗하게 잘 관리합니다.",
  reviewCount: 10,
  keywords: ["정수기", "채광좋음", "깨끗함"],
};

export default function MapPage() {
  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.main}>
        <KakaoMap
        />
        <PropertyPreview 
          data={demo}
          onClick={(id) => console.log("go detail:", id)}
        />
      </div>

      <BottomNav />
    </div>
  );
}
