// "use client";

// import { useMemo } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import styles from "../search.module.css";
// import { LISTINGS } from "../_data";
// import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
// import BottomNav from "@/Components/BottomNav";

// export default function ListingDetailPage() {
//   const router = useRouter();
//   const sp = useSearchParams();
//   const id = sp.get("id") || "";

//   const item = useMemo(() => LISTINGS.find((x) => x.id === id), [id]);

//   if (!item) {
//     return (
//       <div className={styles.page}>
//         <div className={styles.topbar}>
//           <button className={styles.iconBtn} onClick={() => router.back()}>
//             <ArrowBackIosNewRoundedIcon fontSize="small" />
//           </button>
//           <div className={styles.resultsTitle}>매물 상세정보</div>
//           <div style={{ width: 36 }} />
//         </div>
//         <div className={styles.inner}>
//           <div className={styles.emptyBox}>해당 매물을 찾을 수 없습니다.</div>
//         </div>
//         <BottomNav active="home" />
//       </div>
//     );
//   }

//   const hasImages = item.images && item.images.length > 0;

//   return (
//     <div className={styles.page}>
//       <div className={styles.topbar}>
//         <button className={styles.iconBtn} onClick={() => router.back()} aria-label="뒤로가기">
//           <ArrowBackIosNewRoundedIcon fontSize="small" />
//         </button>
//         <div className={styles.resultsTitle}>매물상세정보</div>
//         <div style={{ width: 36 }} />
//       </div>

//       <div className={styles.inner}>
//         {/* 상단 사진 그리드 */}
//         {hasImages && (
//           <div className={styles.photoGrid}>
//             {item.images.slice(0, 3).map((src, i) => (
//               <img key={src} src={src} alt={`photo-${i}`} className={styles.photo} />
//             ))}
//             {item.images.length > 3 && (
//               <div className={styles.photoMore}>
//                 <span className={styles.photoMoreIcon}>🖼</span>
//                 <span>더보기</span>
//               </div>
//             )}
//           </div>
//         )}

//         <section className={styles.detailCard}>
//           <h1 className={styles.detailTitle}>{item.name}</h1>
//           <div className={styles.addr}>{item.address}</div>

//           <div className={styles.kv}>
//             <div><b>관리비</b>: {item.maintenance}</div>
//             <div><b>전세</b>: {item.jeonse}</div>
//             <div><b>주차</b>: {item.parking}</div>
//             <div><b>전용 면적</b>: {item.area_m2}㎡ ({item.area_pyeong}평)</div>
//           </div>
//         </section>

//         <section className={styles.detailCard}>
//           <h2 className={styles.sectionTitle}>매물 소개</h2>
//           <p className={styles.desc}>
//             북동에 창문이 있습니다. 채광이 좋고 깨끗하게 잘 관리합니다.
//           </p>
//         </section>

//         <section className={styles.detailCard}>
//           <h2 className={styles.sectionTitle}>시설정보</h2>
//           <p className={styles.desc}>{item.tags.join(", ")}</p>
//         </section>

//         <section className={styles.reviewBlock}>
//           <div className={styles.reviewHeader}>
//             <h2 className={styles.sectionTitle}>리뷰 <span className={styles.muted}>{item.reviews.length}</span></h2>
//           </div>

//           {item.reviews.map((r) => (
//             <div key={r.id} className={styles.reviewItem}>
//               <div className={styles.avatarSm} />
//               <div>
//                 <div className={styles.reviewMeta}>
//                   <b>{r.author}</b> <span className={styles.muted}>{r.date}</span>
//                 </div>
//                 <div className={styles.reviewText}>{r.text}</div>
//                 <div className={styles.reviewBtns}>
//                   <button className={styles.ghostBtn}>도움돼요</button>
//                   <button className={styles.ghostBtn}>깔끔해요</button>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {!item.reviews.length && <div className={styles.emptyBox}>아직 리뷰가 없습니다.</div>}
//         </section>
//       </div>

//       <BottomNav active="home" />
//     </div>
//   );
// }

"use client";
export default function istingDetailPage() {
  return (
    <div>
        빈페이지
    </div>
  );
}
