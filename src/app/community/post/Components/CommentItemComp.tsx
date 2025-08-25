import styles from "./communityPostDetail.module.css";
import type { CommentItem } from "@/types/community";

export default function CommentItem({ nickname, createdAt, content }: CommentItem) {
  const date = new Date(createdAt);
  const formattedDate = `${date.getFullYear()}. ${String(
    date.getMonth() + 1
  ).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;


  return (
    <div className={styles.reviewItem}>
      <div className={styles.profileCircle}></div>
      <div className={styles.reviewContent}>
        <div className={styles.reviewAuthor}>{nickname}</div>
        <span className={styles.reviewMeta}>{formattedDate}</span>
        <p className={styles.reviewText}>{content}</p>
      </div>
    </div>
  );
}
