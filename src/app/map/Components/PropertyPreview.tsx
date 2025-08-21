// components/PropertyPreviewCard.tsx
"use client";
import React from "react";
import styles from "./styles.module.css";
import type { PropertyPre } from "@/types/PropertyPreview";

type Props = {
  data: PropertyPre;
  onClick?: (id: string) => void; // 카드 클릭시 상세 이동 등
};

export default function PropertyPreview({ data, onClick }: Props) {
  const {
    id,
    name,
    thumbnail,
    deposit,
    yearlyRent,
    price,
    description,
    reviewCount,
    keywords,
  } = data;

  // 상단 가격 라인: deposit/yearlyRent/price 중 있는 것만 연결
  const priceLine = [
    deposit ? `보증금 ${deposit.formatted}` : null,
    yearlyRent ? `연 ${yearlyRent.formatted}` : null,
    !deposit && !yearlyRent && price ? price.formatted : null,
  ]
    .filter(Boolean)
    .join(" / ");

  // 키워드 최대 3개만 칩으로 노출
  const chips = (keywords ?? []).slice(0, 3);

  return (
    <article
      role="button"
      tabIndex={0}
      className={styles.card}
      onClick={() => onClick?.(id)}
      onKeyDown={(e) => (e.key === "Enter" ? onClick?.(id) : null)}
      aria-label={`${name} 미리보기 카드`}
    >
      <div className={styles.thumbWrap}>
        <img
          src={thumbnail}
          alt={`${name} 썸네일`}
          className={styles.thumbnail}
          loading="lazy"
        />
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <h3 className={styles.title}>{name}</h3>
          <span className={styles.review}>리뷰 {reviewCount}</span>
        </header>

        {priceLine && <div className={styles.price}>{priceLine}</div>}
        <div className={styles.description}>{description}</div>

        {chips.length > 0 && (
          <div className={styles.chips}>
            {chips.map((k) => (
              <span key={k} className={styles.chip}>
                {k}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
