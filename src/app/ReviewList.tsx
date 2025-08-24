import Link from "next/link";
import styles from "./page.module.css";
import type { ReviewResponse } from "@/types/propertyPost";

export default function ReviewList({ items }: { items: ReviewResponse[] }) {
  return (
    <div className={styles.reviewCard}>
      {items.slice(0, 4).map((r) => {
        const date = new Date(r.date);
        const formattedDate = `${date.getFullYear()}. ${
          date.getMonth() + 1
        }. ${date.getDate()}`;

        return (
          <Link
            href={`/map/${r.propertyId}`}
            key={r.propertyId}
            className={styles.reviewItem}
          >
            <div className={styles.reviewPlace}>{r.propertyName}</div>
            <div className={styles.reviewText}>{r.texts}</div>
            <div className={styles.metaRow}>
              <span className={styles.date}>{formattedDate}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
