"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const goSearch = () => {
    const q = keyword.trim() ? `?q=${encodeURIComponent(keyword.trim())}` : "";
    router.push(`/search/results${q}`);
  };

  return (
      <input
        className={styles.searchInput}
        placeholder="검색어를 입력하거나 조건을 선택하세요."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && goSearch()} // 엔터로 검색
      />
  );
}
