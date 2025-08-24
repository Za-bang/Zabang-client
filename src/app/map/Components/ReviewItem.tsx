import styles from "./propertyDetail.module.css";
import type { ReviewResponse } from "@/types/propertyPost"; 

export default function ReviewItem({ author, date, texts }: ReviewResponse) {

  const formattedDate = new Date(date).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, 
  });

  return (
    <div className={styles.reviewItem}>
      <div className={styles.profileCircle}></div>
      <div className={styles.reviewContent}>
        <div className={styles.reviewAuthor}>{author}</div>
        <span className={styles.reviewMeta}>{formattedDate}</span>
        <p className={styles.reviewText}>{texts}</p>
      </div>
    </div>
  );
}
