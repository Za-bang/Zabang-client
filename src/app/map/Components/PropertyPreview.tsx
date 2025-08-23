"use client";
import React from "react";
import styles from "./styles.module.css";
import type { PropertyPost } from "@/types/propertyPost";
import Link from "next/link";

export default function PropertyPreviewCard({ data }: { data: PropertyPost }) {
  const { propertyId, name, thumbnails, deposit, yearlyRent, price, description, reviewCount, keywords } = data;

  const priceLine = [
    deposit && `보증금 ${deposit.formatted}`,
    yearlyRent && `연 ${yearlyRent.formatted}`,
    !deposit && !yearlyRent && price?.formatted,
  ].filter(Boolean).join(" / ");

  return (
    <Link href={`/map/${propertyId}`} className={styles.card} aria-label={`${name} 미리보기 카드`}>
      <div className={styles.thumbWrap}>
        <img src={thumbnails[0]} alt={`${name} 썸네일`} className={styles.thumbnail} loading="lazy" />
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <h3 className={styles.title}>{name}</h3>
          <span className={styles.review}>리뷰 {reviewCount}</span>
        </header>

        {priceLine && <div className={styles.price}>{priceLine}</div>}
        <p className={styles.description}>{description}</p>

        {keywords.length > 0 && (
          <div className={styles.chips}>
            {keywords.slice(0, 3).map((keyword) => (
              <span key={keyword} className={styles.chip}>
                {keyword}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
