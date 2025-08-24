import Link from "next/link";
import styles from "./page.module.css";
import type { ReviewResponse } from "@/types/propertyPost";

type Props = {
  items: ReviewResponse[];
};

export default function ReviewList({ items }: Props) {
  return (
    <div className={styles.reviewCard}>
      {items.slice(0, 4).map((r) => (
        <Link
          href={`/map/${r.propertyId}`}
          key={r.propertyId}
          className={styles.reviewItem}
        >
          <div className={styles.reviewPlace}>{r.propertyName}</div>
          <div className={styles.reviewText}>{r.texts}</div>
          <div className={styles.metaRow}>
            <span className={styles.date}>{r.date}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
