import PropertyPostDetail from "../Components/PropertyPostDetail";
import { MOCK_PROPERTY_POST } from "@/data/demoProperties";
import ReviewSection from "../Components/ReviewSection";
import HeaderBack from "@/Components/HeaderBack";
import BottomNav from "@/Components/BottomNav";
import styles from "./page.module.css";

export function generateStaticParams() {
  return MOCK_PROPERTY_POST.map((p) => ({ id: p.propertyId }));
}

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PropertyPostPage({ params }: PageProps) {
  const { id } = await params;

  const post = MOCK_PROPERTY_POST.find((p) => p.propertyId === id);
  if (!post) return <div>매물을 찾을 수 없습니다.</div>;

  return (
    <div className={styles.page}>
      <HeaderBack />
      <div className={styles.main}>
        <PropertyPostDetail post={post} />
        <ReviewSection
          postId={post.propertyId}
          reviewCount={post.reviewCount}
        />
      </div>
      <BottomNav active="map" />
    </div>
  );
}
