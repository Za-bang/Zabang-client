import styles from "./communityPostDetail.module.css";
import type { CommentItem } from "@/types/community";

export default function CommentItem({ nickname, createdAt, content }: CommentItem) {
  return (
    <div className={styles.reviewItem}>
      <div className={styles.profileCircle}></div>
      <div className={styles.reviewContent}>
        <div className={styles.reviewAuthor}>{nickname}</div>
        <span className={styles.reviewMeta}>{createdAt}</span>
        <p className={styles.reviewText}>{content}</p>
      </div>
    </div>
  );
}
