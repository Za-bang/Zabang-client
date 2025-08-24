"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { MOCK_ROOM_DETAILS, MOCK_PROPERTY_AI } from "@/data/demoProperties";
import Header from "@/Components/Header";
import BottomNav from "@/Components/BottomNav";
import PropertyPreview from "@/app/map/Components/PropertyPreview";
import type { RoomDetail } from "@/types/propertyPost";

interface SearchableRoom extends RoomDetail {
  tags?: string[];
}

export default function SearchResultsPage() {
  const sp = useSearchParams();

  const selectedTags = useMemo(() => {
    const raw = sp.get("tags") || "";
    return raw ? raw.split(",").filter(Boolean) : [];
  }, [sp]);

  const keyword = sp.get("q") || "";

  const results: SearchableRoom[] = useMemo(() => {
    let base: SearchableRoom[] = MOCK_ROOM_DETAILS.map((room) => {
      const ai = MOCK_PROPERTY_AI.find((a) => a.propertyId === room.propertyId);
      return {
        ...room,
        tags: ai ? ai.keywords.map((kw) => kw.replace(/^[-+]/, "")) : [],
      };
    });

    if (selectedTags.length > 0) {
      base = base.filter((room) =>
        selectedTags.every((tag) =>
          (room.tags || [])
            .map((t) => t.toLowerCase())
            .includes(tag.toLowerCase())
        )
      );
    }

    if (keyword.trim()) {
      const q = keyword.trim().toLowerCase();
      base = base.filter(
        (L) =>
          L.name.toLowerCase().includes(q) ||
          L.address.toLowerCase().includes(q) ||
          (L.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }

    return base;
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
              <span className={styles.selectedLead}>
                조건에 맞는 매물 결과입니다.
              </span>
            </>
          ) : (
            <span className={styles.selectedLead}>모든 매물 결과입니다.</span>
          )}
        </div>

        <div className={styles.rlist}>
          {results.map((room) => {
            const aiResult = MOCK_PROPERTY_AI.find(
              (ai) => ai.propertyId === room.propertyId
            );

            return (
              <PropertyPreview
                key={room.propertyId}
                data={room}
                reviewAI={aiResult}
              />
            );
          })}
          {!results.length && (
            <div className={styles.emptyBox}>
              <div className={styles.selectedLead}>
                조건에 맞는 매물이 없습니다.
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNav active="map" />
    </div>
  );
}
