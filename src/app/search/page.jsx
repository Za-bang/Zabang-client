"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { TAG_GROUPS } from "@/types/constants";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import BottomNav from "@/Components/BottomNav";


export default function SearchFilterPage() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState([]); // 문자열 배열

  const toggle = (tag) =>
    setSelected((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  const goSearch = () => {
    const tags = encodeURIComponent(selected.join(","));
    const q = keyword.trim() ? `&q=${encodeURIComponent(keyword.trim())}` : "";
    router.push(`/search/results?tags=${tags}${q}`);
  };

  const hasSelected = useMemo(() => selected.length > 0 || keyword.trim().length > 0, [selected, keyword]);

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <button className={styles.iconBtn} onClick={() => router.back()} aria-label="뒤로가기">
          <ArrowBackIosNewRoundedIcon fontSize="small" />
        </button>
        <input
          className={styles.searchInput}
          placeholder="검색어를 입력하거나 조건을 선택하세요."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      {/* 메인 */}
      <div className={styles.main}>
        <div>
        {TAG_GROUPS.map((group) => (
          <section key={group.key} className={styles.group}>
            <div className={styles.groupTitle}>{group.label}</div>
            <div className={styles.chips}>
              {group.tags.map((t) => (
                <button
                  key={t}
                  onClick={() => toggle(t)}
                  className={`${styles.chip} ${selected.includes(t) ? styles.chipOn : ""}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className={styles.bottomBar}>
        <button className={styles.primaryBtn} onClick={goSearch} disabled={!hasSelected}>
          검색하기
        </button>
      </div>
</div>
      <BottomNav active="" />
    </div>
  );
}
