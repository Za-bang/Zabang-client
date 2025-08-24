"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { MOCK_ROOM_DETAILS, MOCK_PROPERTY_AI } from "@/data/demoProperties";
import Header from "@/Components/Header";
import BottomNav from "@/Components/BottomNav";
import PropertyPreview from "@/app/map/Components/PropertyPreview";
import type { RoomDetail, ReviewAIResult } from "@/types/propertyPost";

export default function SearchResultsPageInner() {
  const sp = useSearchParams();

  const selectedTags = useMemo(() => {
    const raw = sp.get("tags") || "";
    return raw ? raw.split(",").filter(Boolean) : [];
  }, [sp]);

  const keyword = sp.get("q") || "";

  const results: (RoomDetail & { reviewAI?: ReviewAIResult; tags?: string[] })[] =
    useMemo(() => {
      return MOCK_ROOM_DETAILS.map((room) => {
        const ai = MOCK_PROPERTY_AI.find((a) => a.propertyId === room.propertyId);
        return {
          ...room,
          reviewAI: ai,
          tags: ai ? ai.keywords.map((kw) => kw.replace(/^[-+]/, "")) : [],
        };
      }).filter((room) => {
        // 태그 필터
        if (selectedTags.length > 0) {
          const tagOk = selectedTags.every((tag) =>
            (room.tags || []).map((t) => t.toLowerCase()).includes(tag.toLowerCase())
          );
          if (!tagOk) return false;
        }
        // 키워드 필터
        if (keyword.trim()) {
          const q = keyword.trim().toLowerCase();
          return (
            room.name.toLowerCase().includes(q) ||
            room.address.toLowerCase().includes(q) ||
            (room.tags || []).some((t) => t.toLowerCase().includes(q))
          );
        }
        return true;
      });
    }, [selectedTags, keyword]);

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.main}>
        <div className={styles.selectedRow}>
          {selectedTags.length ? (
            <>
              <span className={styles.selectedLead}>선택하신</span>
              {selectedTags.map((t) => (
                <span key={t} className={styles.selectedChip}>
                  {t}
                </span>
              ))}
              <span>조건에 맞는 매물 결과입니다.</span>
            </>
          ) : (
            <span>모든 매물 결과입니다.</span>
          )}
        </div>

        <div className={styles.rlist}>
          {results.map((room) => (
            <PropertyPreview
              key={room.propertyId}
              data={room}
              reviewAI={room.reviewAI}
            />
          ))}

          {!results.length && (
            <div className={styles.emptyBox}>조건에 맞는 매물이 없습니다.</div>
          )}
        </div>
      </div>
      <BottomNav active="map" />
    </div>
  );
}
