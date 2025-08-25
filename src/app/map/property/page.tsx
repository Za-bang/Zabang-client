"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PropertyPostDetail from "./Components/PropertyPostDetail";
import ReviewSection from "./Components/ReviewSection";
import HeaderBack from "@/Components/HeaderBack";
import BottomNav from "@/Components/BottomNav";
import styles from "./page.module.css";

import { getRoomDetail } from "@/lib/api";
import type { RoomDetail } from "@/types/propertyPost";

export default function PropertyPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<RoomDetail | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await getRoomDetail(id as string);
        setPost(data);
      } catch (err) {
        console.error("⚠️ 매물 상세 조회 실패:", err);
      }
    })();
  }, [id]);

  if (!id) return <div>잘못된 접근입니다.</div>;
  if (!post) return <div>매물 정보를 불러오는 중...</div>;

  return (
    <div className={styles.page}>
      <HeaderBack />
      <div className={styles.main}>
        <PropertyPostDetail post={post} />
        <div className={styles.review}>
          <ReviewSection post={post.propertyId} />
        </div>
      </div>
      <BottomNav active="map" />
    </div>
  );
}
