import Link from "next/link";
import styles from "./page.module.css";
import type { propertyReview } from "@/types/propertyReview";

type Props = {
  items: propertyReview[];
};

export default function ReviewList({ items }: Props) {
  return (
    <div className={styles.reviewCard}>
      {items.slice(0, 4).map((r) => (
        <Link
          href={`/map/${r.propertyId}`}
          key={r.id}
          className={styles.reviewItem}
        >
          <div className={styles.reviewPlace}>{r.place}</div>
          <div className={styles.reviewText}>{r.text}</div>
          <div className={styles.metaRow}>
            <span className={styles.date}>{r.date}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
