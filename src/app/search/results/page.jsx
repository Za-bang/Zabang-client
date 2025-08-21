// "use client";

// import { useMemo } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import styles from "../search.module.css";
// import { filterListings } from "../_data";
// import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
// import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
// import BottomNav from "@/Components/BottomNav";

// export default function SearchResultsPage() {
//   const router = useRouter();
//   const sp = useSearchParams();

//   const selectedTags = useMemo(() => {
//     const raw = sp.get("tags") || "";
//     return raw ? raw.split(",").filter(Boolean) : [];
//   }, [sp]);

//   const keyword = sp.get("q") || "";

//   const results = useMemo(() => {
//     const base = filterListings(selectedTags);
//     if (!keyword.trim()) return base;
//     const q = keyword.trim().toLowerCase();
//     return base.filter(
//       (L) =>
//         L.name.toLowerCase().includes(q) ||
//         L.address.toLowerCase().includes(q) ||
//         L.tags.some((t) => t.toLowerCase().includes(q))
//     );
//   }, [selectedTags, keyword]);

//   return (
//     <div className={styles.page}>
//       {/* 상단 바 */}
//       <div className={styles.topbar}>
//         <button className={styles.iconBtn} onClick={() => router.back()} aria-label="뒤로가기">
//           <ArrowBackIosNewRoundedIcon fontSize="small" />
//         </button>
//         <div className={styles.resultsTitle}>검색결과</div>
//         <button className={styles.iconBtn} onClick={() => router.push("/search")} aria-label="다시 검색">
//           <SearchRoundedIcon />
//         </button>
//       </div>

//       <div className={styles.inner}>
//         {/* 선택된 태그 표시 */}
//         <div className={styles.selectedRow}>
//           {selectedTags.length ? (
//             <>
//               <span className={styles.selectedLead}>선택하신</span>
//               {selectedTags.map((t) => (
//                 <span key={t} className={styles.selectedChip}>
//                   {t}
//                 </span>
//               ))}
//               <span>조건에 맞는 매물 결과입니다.</span>
//             </>
//           ) : (
//             <span>모든 매물 결과입니다.</span>
//           )}
//         </div>

//         {/* 결과 목록 */}
//         <div className={styles.rlist}>
//           {results.map((L) => {
//             const hasImage = !!(L.images && L.images[0]);
//             return (
//               <div
//                 key={L.id}
//                 className={`${styles.rcard} ${!hasImage ? styles.rcardNoThumb : ""}`}
//                 onClick={() => router.push(`/search/detail?id=${L.id}`)}
//                 role="button"
//                 tabIndex={0}
//               >
//                 {hasImage && (
//                   <img src={L.images[0]} alt="" className={styles.rthumb} />
//                 )}

//                 <div className={styles.rcBody}>
//                   <div className={styles.rcTitle}>{L.name}</div>
//                   <div className={styles.rcLine}>
//                     보증금 {L.deposit} / 연 {L.yearly}
//                   </div>
//                   <div className={styles.rcSub}>
//                     관리비: {L.maintenance} · 전세: {L.jeonse} · 주차: {L.parking}
//                   </div>
//                   <div className={styles.rcSub}>
//                     전용 면적: {L.area_m2}㎡ ({L.area_pyeong}평)
//                   </div>
//                   <div className={styles.rcFoot}>후기 {L.reviews.length}</div>
//                 </div>
//               </div>
//             );
//           })}

//           {!results.length && (
//             <div className={styles.emptyBox}>조건에 맞는 매물이 없습니다.</div>
//           )}
//         </div>
//       </div>

//       <BottomNav active="home" />
//     </div>
//   );
// }

"use client";
export default function SearchResultsPage() {
  return (
    <div>
        빈페이지
    </div>
  );
}
