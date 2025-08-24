"use client";

import { useState } from "react";
import styles from "./searchBar.module.css";

export default function SearchBar({ onSearch }: { onSearch: (v: string) => void }) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value); 
  };

  return (
    <div className={styles.searchBar}>
      <input
        value={query}
        onChange={handleChange}
        placeholder="검색어를 입력하세요"
        className={styles.input}
      />
    </div>
  );
}
