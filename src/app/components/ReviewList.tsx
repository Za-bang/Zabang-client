"use client";

import styles from "./page.module.css";
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
              <span className={styles.comment} title="댓글">
                <ChatBubbleOutlineRoundedIcon  fontSize="inherit" className={styles.chatIcon}/>
                {r.comments}
              </span>
          </div>
        </article>
      ))}
    </div>
  );
}
