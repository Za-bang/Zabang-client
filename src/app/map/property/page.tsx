import PropertyPostDetail from "./Components/PropertyPostDetail";
import { MOCK_ROOM_DETAILS } from "@/data/demoProperties";
import ReviewSection from "./Components/ReviewSection";
import HeaderBack from "@/Components/HeaderBack";
import BottomNav from "@/Components/BottomNav";
import styles from "./page.module.css";
import { useParams } from "next/navigation";

export function generateStaticParams() {
  return MOCK_ROOM_DETAILS.map((p) => ({ id: p.propertyId }));
} 

export default async function PropertyPostPage() {
  const {id}=useParams();

  const post = MOCK_ROOM_DETAILS.find((p) => p.propertyId === id);
  if (!post) return <div>매물을 찾을 수 없습니다.</div>;

  return (
    <div className={styles.page}>
      <HeaderBack />
      <div className={styles.main}>
        <PropertyPostDetail post={post} />
        <div className={styles.review}>
        <ReviewSection 
          post={post.propertyId}
        />
        </div>
      </div>
      <BottomNav active="map" />
    </div>
  );
}
