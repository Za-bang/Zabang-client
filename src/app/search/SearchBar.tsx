"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./searchBar.module.css";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search/results?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="검색어를 입력하세요"
        className={styles.input}
      />
      <button onClick={handleSearch} className={styles.button}>
        검색
      </button>
    </div>
  );
}
