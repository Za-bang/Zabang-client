"use client";
import styles from "./propertyDetail.module.css";
import ReviewItem from "./ReviewItem";
import { MOCK_REVIEWS } from "@/data/demoReviews";
import { MOCK_PROPERTY_AI } from "@/data/demoProperties";
import { ReviewResponse } from "@/types/propertyPost"; 

export default function ReviewSection({ post }: { post: string }) {
  const filteredReviews: ReviewResponse[] = MOCK_REVIEWS.filter(
    (r) => r.propertyId === post
  );

  const aiResult = MOCK_PROPERTY_AI.find((ai) => ai.propertyId === post);

  return (
    <div className={styles.main}>

      <div className={styles.aiSummaryTitle}>AI 리뷰 요약</div>
      {aiResult?.summary && (
        <div className={styles.aiSummary}>
          {aiResult.summary}
        </div>
      )}
      <div className={styles.reviewTitle}>리뷰 {filteredReviews.length}</div>

<div className={styles.reviews}>
      {filteredReviews.map((r, i) => (
        <ReviewItem key={i} {...r} />
      ))}
</div>
      <div className={styles.commentInput}>
        <input className={styles.input} placeholder="리뷰를 작성하세요" />
        <button className={styles.sendBtn}>리뷰 등록</button>
      </div>
    </div>
  );
}
