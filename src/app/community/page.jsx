"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./community.module.css";
import { FILTERS } from "./_data";
import { loadPosts, deletePost, reportPost } from "./_store";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

export default function CommunityPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("전체");
  const [posts, setPosts] = useState([]);
  const [menuPostId, setMenuPostId] = useState(null);

  useEffect(() => {
    const sync = () => setPosts(loadPosts());
    sync();
    const onChange = () => sync();
    window.addEventListener("zabang:posts-changed", onChange);
    const onStorage = (e) => {
      if (e.key === "zabang_posts" || e.key === "zabang_posts_last") sync();
    };
    window.addEventListener("storage", onStorage);
    const close = () => setMenuPostId(null);
    window.addEventListener("click", close);
    return () => {
      window.removeEventListener("zabang:posts-changed", onChange);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("click", close);
    };
  }, []);

  const filtered = useMemo(() => {
    if (filter === "전체") return posts;
    return posts.filter((p) => p.type === filter || p.region === filter);
  }, [filter, posts]);

  const openPost = (id) => router.push(`/community/view?id=${id}`);

  const openMenu = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    setMenuPostId((cur) => (cur === id ? null : id));
  };

  const doReport = (id) => {
    reportPost(id);
    alert("신고가 접수되었습니다.");
    setMenuPostId(null);
  };

  const doDelete = (id) => {
    if (!confirm("이 게시글을 삭제할까요?")) return;
    deletePost(id);
    setMenuPostId(null);
    setPosts(loadPosts());
  };

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.inner}>
        {/* 필터 */}
        <div className={styles.filterRow}>
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`${styles.chip} ${filter === f ? styles.chipActive : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* 목록 */}
        <div className={styles.list}>
          {filtered.map((p) => {
            const hasImage = !!(p.image && String(p.image).trim());
            return (
              <div
                key={p.id}
                className={`${styles.card} ${!hasImage ? styles.cardNoThumb : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => openPost(p.id)}
                onKeyDown={(e) => e.key === "Enter" && openPost(p.id)}
              >
                {/* 좌측 썸네일: 이미지 있을 때만 렌더 */}
                {hasImage && <img src={p.image} alt="" className={styles.thumb} />}

                {/* 우측 본문 */}
                <div className={styles.cardBody}>
                  <div className={styles.cardHeader}>
                    <div className={styles.titleRow}>
                      {p.status && <span className={styles.badge}>{p.status}</span>}
                      <span className={styles.title}>{p.title}</span>
                    </div>

                    {/* 점3개 메뉴 */}
                    <div className={styles.cardActionsRight} onClick={(e) => e.stopPropagation()}>
                      <button
                        className={styles.iconGhost}
                        aria-label="더보기"
                        title="더보기"
                        onClick={(e) => openMenu(e, p.id)}
                      >
                        <MoreHorizRoundedIcon fontSize="small" />
                      </button>

                      {menuPostId === p.id && (
                        <div className={styles.menu}>
                          <button className={styles.menuItem} onClick={() => doReport(p.id)}>
                            <FlagOutlinedIcon fontSize="small" /> 신고하기
                          </button>
                          <button className={styles.menuItemDanger} onClick={() => doDelete(p.id)}>
                            <DeleteOutlineRoundedIcon fontSize="small" /> 삭제하기
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.metaTop}>
                    {p.date} · {p.region} · {p.type}
                  </div>

                  {/* 요약 텍스트 */}
                  {p.excerpt && <div className={styles.excerpt}>{p.excerpt}</div>}

                  <div className={styles.metaBottom}>
                    <span className={styles.metaIconRow}>
                      <ChatBubbleOutlineRoundedIcon fontSize="small" />
                      {p.comments.length}
                    </span>
                    <span className={styles.metaIconRow}>
                      <VisibilityOutlinedIcon fontSize="small" />
                      {p.views}
                    </span>
                  </div>

                  {/* 접근성용 상세 링크(시각적 숨김) */}
                  <Link
                    href={`/community/view?id=${encodeURIComponent(p.id)}`}
                    className={styles.srOnly}
                    aria-hidden
                    tabIndex={-1}
                  >
                    상세 보기
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 글쓰기 FAB */}
      <Link href="/community/write" className={styles.fab} aria-label="글쓰기">
        <AddRoundedIcon />
      </Link>

      <BottomNav active="board" />
    </div>
  );
}
