"use client";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import styles from "./propertyDetail.module.css";
import ReviewItem from "./ReviewItem";
import { MOCK_REVIEWS } from "@/data/demoReviews";
import { ReviewResponse } from "@/types/propertyPost";

export default function ReviewSection({ post }: { post: string }) {
  const [reviews, setReviews] = useState<ReviewResponse[]>(
    MOCK_REVIEWS.filter((r) => r.propertyId === post)
  );

  const [input, setInput] = useState("");
  const [rating, setRating] = useState<number | null>(0);

  const handleAddReview = () => {
    if (!input.trim() || !rating) return;

    const newReview: ReviewResponse = {
      propertyId: post,
      propertyName: "매물 이름 예시", // TODO: 실제 post.name 전달
      author: "이남경",
      texts: input,
      grade: rating,
      date: new Date().toISOString(),
      imagePath: [],
    };

    setReviews((prev) => [...prev, newReview]);
    setInput("");
    setRating(0);
  };

  return (
    <div className={styles.main}>
      <div className={styles.reviewTitle}>리뷰 {reviews.length}</div>

      <div className={styles.reviews}>
        {reviews.map((r, i) => (
          <ReviewItem key={i} {...r} />
        ))}
      </div>

      <div className={styles.commentInput}>
        <Rating
          name="review-rating"
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
          size="large"    
        />

        <input
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="리뷰를 작성하세요"
        />
        <button className={styles.sendBtn} onClick={handleAddReview}>
          리뷰 등록
        </button>
      </div>
    </div>
  );
}
