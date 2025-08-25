"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import BottomNav from "@/Components/BottomNav";
import SearchBar from "./SearchBar";
import PropertyPreview from "@/app/map/Components/PropertyPreview"; // ✅ 매물 카드
import type { RoomDetail } from "@/types/propertyPost";
import { getCombinedTagGroups } from "@/types/getTagGroups";

export default function SearchFilterPage() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [rooms, setRooms] = useState<RoomDetail[]>([]); // ✅ 검색 결과 상태

  const TAG_GROUPS = useMemo(() => getCombinedTagGroups(), []);

  const toggle = (tag: string) =>
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const goSearch = () => {
    const tags = encodeURIComponent(selected.join(","));
    const q = keyword.trim() ? `&q=${encodeURIComponent(keyword.trim())}` : "";
    router.push(`/search/results?tags=${tags}${q}`);
  };

  return (
    <div className={styles.page}>
      {/* 상단 검색 바 */}
      <div className={styles.topbar}>
        <div className={styles.left}>
          <button
            className={styles.iconBtn}
            onClick={() => router.back()}
            aria-label="뒤로가기"
          >
            <ArrowBackIosNewRoundedIcon fontSize="medium" />
          </button>
        </div>
        <div className={styles.center}>
          {/* ✅ 검색 결과를 setRooms로 받음 */}
          <SearchBar onResults={setRooms} />
        </div>
        <div className={styles.right}></div>
      </div>

      {/* 태그 필터 */}
      <div className={styles.main}>
        {TAG_GROUPS.map((group) => (
          <section key={group.key} className={styles.group}>
            <div className={styles.groupTitle}>{group.label}</div>
            <div className={styles.chips}>
              {group.tags.map((t) => (
                <button
                  key={t}
                  onClick={() => toggle(t)}
                  className={`${styles.chip} ${
                    selected.includes(t) ? styles.chipOn : ""
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </section>
        ))}

        {/* ✅ 검색 결과 리스트 */}
        <div className={styles.results}>
          {rooms.length === 0 ? (
            <p>검색 결과가 없습니다.</p>
          ) : (
            rooms.map((room) => (
              <PropertyPreview key={room.propertyId} data={room} />
            ))
          )}
        </div>

        {/* 하단 검색 버튼 */}
        <div className={styles.bottomBar}>
          <button className={styles.searchBtn} onClick={goSearch}>
            검색하기
          </button>
        </div>
      </div>

      <BottomNav active="none" />
    </div>
  );
}
