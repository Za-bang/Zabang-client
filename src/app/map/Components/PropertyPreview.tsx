"use client";
import styles from "./styles.module.css";
import type { RoomDetail, ReviewAIResult } from "@/types/propertyPost";
import Link from "next/link";

interface PropertyPreviewProps {
  data: RoomDetail;
  reviewAI?: ReviewAIResult;
}

export default function PropertyPreview({
  data,
  reviewAI,
}: PropertyPreviewProps) {
  const { propertyId, name, imagePath, deposit, rentPrice, area } = data;

  return (
    <Link
      href={`/map/${propertyId}`}
      className={styles.card}
      aria-label={`${name} 미리보기 카드`}
    >
      <div className={styles.thumbWrap}>
        <img
          src={imagePath[0]}
          alt={`${name} 썸네일`}
          className={styles.thumbnail}
          loading="lazy"
        />
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.title}>
            {name}
            <span className={styles.area}>{area}구역</span>
          </div>
        </header>

        <div className={styles.price}>
          보증금 {deposit} | {rentPrice}
        </div>

        {reviewAI?.keywords?.length ? (
          <div className={styles.chips}>
            {reviewAI.keywords.slice(0, 3).map((keyword: string) => (
              <span key={keyword} className={styles.chip}>
                {keyword}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}

