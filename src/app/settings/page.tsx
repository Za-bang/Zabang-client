"use client";

// import { useEffect, useRef, useState } from "react";
// import styles from "./settings.module.css";
// import { loadProfile, saveProfile } from "./_store";
// import Header from "@/Components/Header";
// import BottomNav from "@/Components/BottomNav";
// import { APP_VERSION } from "../_version";

// // icons
// import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
// import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
// import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
// import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
// import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
// import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

// const REGIONS = ["1구역", "2구역", "3구역", "4구역"];

// export default function SettingsPage() {
//   const [p, setP] = useState(loadProfile());
//   const fileRef = useRef(null);

//   // “저장됨” 뱃지
//   const [justSaved, setJustSaved] = useState(false);
//   const savedTimer = useRef(null);
//   const markSaved = () => {
//     setJustSaved(true);
//     clearTimeout(savedTimer.current);
//     savedTimer.current = setTimeout(() => setJustSaved(false), 1200);
//   };

//   useEffect(() => {
//     const onChange = () => setP(loadProfile());
//     window.addEventListener("zabang:profile-changed", onChange);
//     return () => window.removeEventListener("zabang:profile-changed", onChange);
//   }, []);

//   // ===== 기본정보 자동 저장(debounce 500ms) =====
//   const debounceRef = useRef(null);
//   const onField = (k, v) => {
//     const next = { ...p, [k]: v };
//     setP(next);
//     clearTimeout(debounceRef.current);
//     debounceRef.current = setTimeout(() => {
//       saveProfile(next);
//       markSaved();
//     }, 500);
//   };

//   // 토글 즉시 저장
//   const setNotify = (k, v) => {
//     const next = { ...p, notifications: { ...p.notifications, [k]: v } };
//     setP(next); saveProfile(next); markSaved();
//   };
//   const setPrivacy = (k, v) => {
//     const next = { ...p, privacy: { ...p.privacy, [k]: v } };
//     setP(next); saveProfile(next); markSaved();
//   };

//   const onPickAvatar = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => {
//       const next = { ...p, avatar: reader.result };
//       setP(next); saveProfile(next); markSaved();
//     };
//     reader.readAsDataURL(file);
//   };

//   const toggleRegion = (tag) => {
//     const has = p.notifications.interestRegions.includes(tag);
//     const nextRegions = has
//       ? p.notifications.interestRegions.filter((t) => t !== tag)
//       : [...p.notifications.interestRegions, tag];
//     const next = { ...p, notifications: { ...p.notifications, interestRegions: nextRegions } };
//     setP(next); saveProfile(next); markSaved();
//   };

//   return (
//     <div className={styles.page}>
//       {/* 설정은 검색 아이콘 숨김 */}
//       <Header showSearch={false} />

//       <div className={styles.inner}>
//         {/* 기본정보 */}
//         <section className={styles.card}>
//           <div className={styles.cardTitle}>
//             기본정보
//             {justSaved && (
//               <span className={styles.savedBadge}>
//                 <CheckCircleRoundedIcon fontSize="small" />
//                 저장됨
//               </span>
//             )}
//           </div>

//           {/* 인스타 스타일: 상단 중앙 큰 아바타 */}
//           <div className={styles.avatarCenterWrap}>
//             {p.avatar ? (
//               <img src={p.avatar} alt="avatar" className={styles.avatarLg} />
//             ) : (
//               <div className={styles.avatarLgPlaceholder}>N</div>
//             )}
//             <button
//               className={styles.avatarEditBtn}
//               onClick={() => fileRef.current?.click()}
//               aria-label="프로필 사진 변경"
//               title="프로필 사진 변경"
//             >
//               <PhotoCameraRoundedIcon fontSize="small" />
//             </button>
//             <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPickAvatar} />
//           </div>

//           {/* 폼 필드 */}
//           <div className={styles.formCol}>
//             <div className={styles.field}>
//               <label className={styles.label}>이름</label>
//               <input
//                 className={styles.input}
//                 value={p.name}
//                 onChange={(e) => onField("name", e.target.value)}
//                 placeholder="홍길동"
//               />
//             </div>

//             <div className={styles.field}>
//               <label className={styles.label}>닉네임</label>
//               <input
//                 className={styles.input}
//                 value={p.nickname}
//                 onChange={(e) => onField("nickname", e.target.value)}
//                 placeholder="우장산너구리"
//               />
//             </div>

//             <div className={styles.field}>
//               <label className={styles.label}>연락처</label>
//               <input
//                 className={styles.input}
//                 value={p.phone}
//                 onChange={(e) => onField("phone", e.target.value)}
//                 placeholder="010-0000-0000"
//               />
//             </div>
//           </div>
//         </section>

//         {/* 알림설정 */}
//         <section className={styles.card}>
//           <div className={styles.cardTitle}>
//             <NotificationsActiveRoundedIcon fontSize="small" />
//             알림설정
//           </div>

//           <ToggleRow label="푸시 알림 수신" checked={p.notifications.push} onChange={(v) => setNotify("push", v)} />
//           <ToggleRow label="신규 매물 알림" disabled={!p.notifications.push} checked={p.notifications.newListing} onChange={(v) => setNotify("newListing", v)} />
//           <ToggleRow label="관심 지역 알림" disabled={!p.notifications.push} checked={p.notifications.interestRegion} onChange={(v) => setNotify("interestRegion", v)} />
//           <ToggleRow label="댓글/답글 알림" disabled={!p.notifications.push} checked={p.notifications.comment} onChange={(v) => setNotify("comment", v)} />

//           <div className={styles.subLabel}>관심 지역</div>
//           <div className={styles.chips}>
//             {REGIONS.map((t) => (
//               <button
//                 key={t}
//                 className={`${styles.chip} ${p.notifications.interestRegions.includes(t) ? styles.chipOn : ""}`}
//                 onClick={() => toggleRegion(t)}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>
//         </section>

//         {/* 보안 및 개인정보 */}
//         <section className={styles.card}>
//           <div className={styles.cardTitle}>
//             <SecurityRoundedIcon fontSize="small" />
//             보안 및 개인정보
//           </div>

//           <DisclosureRow
//             label="비밀번호 변경"
//             buttonLabel="변경"
//             onClick={() => alert("비밀번호 변경은 백엔드 연동 후 제공됩니다.")}
//           />

//           <div className={styles.subLabel}>개인정보 접근 동의</div>
//           <ToggleRow label="위치 정보 접근 허용" checked={p.privacy.location} onChange={(v) => setPrivacy("location", v)} />
//           <ToggleRow label="사진/미디어 접근 허용" checked={p.privacy.photos} onChange={(v) => setPrivacy("photos", v)} />
//           <ToggleRow label="연락처 접근 허용" checked={p.privacy.contacts} onChange={(v) => setPrivacy("contacts", v)} />
//         </section>

//         {/* 계정 관리(진입만) */}
//         <section className={styles.card}>
//           <div className={styles.cardTitle}>계정</div>
//           <div
//             className={styles.listRow}
//             role="button"
//             tabIndex={0}
//             onClick={() => (location.href = "/settings/account")}
//           >
//             계정관리
//             <ChevronRightRoundedIcon className={styles.chev} />
//           </div>
//         </section>

//         {/* 기타 */}
//         <section className={styles.card}>
//           <div className={styles.cardTitle}>기타</div>

//           <div
//             className={styles.listRow}
//             role="button"
//             tabIndex={0}
//             onClick={() => (location.href = "/settings/feedback")}
//           >
//             건의하기
//             <ChevronRightRoundedIcon className={styles.chev} />
//           </div>

//           <div className={styles.listRow}>
//             <span>앱 버전</span>
//             <span className={styles.muted}>{APP_VERSION}</span>
//           </div>
//         </section>
//       </div>

//       <BottomNav active="settings" />
//     </div>
//   );
// }

// /* ───────────── Sub Components ───────────── */
// function ToggleRow({ label, checked, onChange, disabled }) {
//   return (
//     <label className={`${styles.row} ${disabled ? styles.rowDisabled : ""}`}>
//       <span>{label}</span>
//       <input
//         type="checkbox"
//         className={styles.switch}
//         checked={!!checked}
//         disabled={disabled}
//         onChange={(e) => onChange(e.target.checked)}
//       />
//     </label>
//   );
// }
// function DisclosureRow({ label, buttonLabel = "열기", onClick }) {
//   return (
//     <div className={styles.listRow} role="button" onClick={onClick} tabIndex={0}>
//       <span>{label}</span>
//       <span className={styles.rightBtn}>{buttonLabel}</span>
//     </div>
//   );
// }

export default function Settings(){

  return (
    <div>임시페이지</div>
  )
}