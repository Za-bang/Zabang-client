"use client";
import styles from "./propertyDetail.module.css";
import ReviewItem from "./ReviewItem";
import { MOCK_REVIEWS } from "@/data/demoReviews";

type ReviewSectionProps = {
  postId: string;
  reviewCount: number;
};

export default function ReviewSection({
  postId,
  reviewCount,
}: ReviewSectionProps) {
  return (
    <div className={styles.main}>
      <div className={styles.reviewTitle}>리뷰 · {reviewCount}</div>

      {MOCK_REVIEWS.map((r) => (
        <ReviewItem key={r.id} {...r} />
      ))}

      <div className={styles.commentInput}>
        <input className={styles.input} />
        <button className={styles.sendBtn}>리뷰 등록</button>
      </div>
    </div>
  );
}
