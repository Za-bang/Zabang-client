import PropertyPostDetail from "./Components/PropertyPostDetail";
import ReviewSection from "./Components/ReviewSection";
import HeaderBack from "@/Components/HeaderBack";
import BottomNav from "@/Components/BottomNav";
import styles from "./page.module.css";

import type { RoomDetail } from "@/types/propertyPost";
import { getRoomDetail } from "@/lib/api";

export default async function PropertyPage() {
  let post: RoomDetail | null = null;

  try {
    post = await getRoomDetail("1");
  } catch (err) {
    console.error("매물 상세 조회 실패:", err);
  }

  if (!post) return <div>매물을 찾을 수 없습니다.</div>;

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
