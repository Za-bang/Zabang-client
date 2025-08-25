"use client";
import styles from "./page.module.css";
import BottomNav from "@/Components/BottomNav";
import Header from "@/Components/Header";
import PropertyPreview from "./Components/PropertyPreview";
import dynamic from "next/dynamic";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getRoomList, getReviews } from "@/lib/api";   
import type { RoomDetail, ReviewResponse } from "@/types/propertyPost";
import ReviewList from "@/app/ReviewList";

const KMap = dynamic(
  () => import("./Components/KakaoMap").then((mod) => mod.KakaoMap),
  { ssr: false }
);

export default function MapPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<RoomDetail[]>([]);
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);

  const handlGoToSearchPage = () => {
    router.push("../search");
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getRoomList();
        setRooms(data);

        // 예시: 첫 번째 매물 리뷰 불러오기
        if (data.length > 0) {
          const reviewData = await getReviews(data[0].propertyId);
          setReviews(reviewData);
        }
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
      }
    })();
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.main}>
        <KMap />
        <div className={styles.search}>
          <IconButton onClick={handlGoToSearchPage}>
            <FilterAltIcon fontSize="large" />
          </IconButton>
        </div>

        <div className={styles.propertyPrev}>
          {rooms.map((room) => (
            <PropertyPreview key={room.propertyId} data={room} />
          ))}
        </div>

        {/* 리뷰 리스트 */}
        <ReviewList items={reviews} />
      </div>
      <BottomNav active="map" />
    </div>
  );
}
