"use client";

import { Suspense } from "react";
import SearchResultsPageInner from "./SearchResultsPageInner";

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <SearchResultsPageInner />
    </Suspense>
  );
}
