import styles from "./propertyDetail.module.css";
import type { propertyReview } from "@/types/propertyReview";

export default function ReviewItem({ reviewAuthor, date, text }: propertyReview) {
  return (
    <div className={styles.reviewItem}>
      <div className={styles.profileCircle}></div>
      <div className={styles.reviewContent}>
        <div className={styles.reviewAuthor}>{reviewAuthor}</div>
        <span className={styles.reviewMeta}>{date}</span>
        <p className={styles.reviewText}>{text}</p>
      </div>
    </div>
  );
}
