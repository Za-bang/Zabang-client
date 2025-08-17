"use client";

import styles from "../page.module.css";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

export default function ReviewList({ items }) {
  return (
    <div className={styles.reviewCard}>
      {items.map((r) => (
        <article className={styles.reviewItem} key={r.id}>
          <div className={styles.reviewPlace}>{r.place}</div>
          <div className={styles.reviewText}>{r.text}</div>

          <div className={styles.metaRow}>
            <span className={styles.date}>{r.date}</span>

            <div className={styles.reactions}>
              <span className={styles.reaction} title="좋아요">
                <FavoriteBorderRoundedIcon fontSize="small" />
                {r.likes}
              </span>
              <span className={styles.reaction} title="댓글">
                <ChatBubbleOutlineRoundedIcon fontSize="small" />
                {r.comments}
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
