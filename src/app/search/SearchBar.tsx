"use client";

import { useState } from "react";
import styles from "./searchBar.module.css";
import type { RoomDetail } from "@/types/propertyPost";
import { searchRoomByName } from "@/lib/api"; 

export default function SearchBar({
  onResults,
}: {
  onResults: (rooms: RoomDetail[]) => void; // 검색 결과를 부모로 전달
}) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const data = await searchRoomByName(query);
      onResults(data); 
    } catch (err) {
      console.error(err);
      alert("검색에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요"
        className={styles.input}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()} // 엔터로 검색 가능
      />
      <button onClick={handleSearch} disabled={loading} className={styles.button}>
        {loading ? "검색중..." : "검색"}
      </button>
    </div>
  );
}
