"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import BottomNav from "@/Components/BottomNav";
import SearchBar from "./SearchBar";
import { getCombinedTagGroups } from "@/types/getTagGroups";

export default function SearchFilterPage() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

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
          <SearchBar onSearch={setKeyword} />
        </div>
        <div className={styles.right}></div>
      </div>

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
