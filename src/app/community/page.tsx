"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import Header from "@/Components/Header";
import HeaderBack from "@/Components/HeaderBack";
import BottomNav from "@/Components/BottomNav";

import { FILTERS } from "@/types/constants";
import type { PostListItem, PostDetail } from "@/types/community";

import PostCardList from "./Components/PostCardList";
import CommunityPostDetail from "./Components/CommunityPostDetail";
import CommentSection from "./Components/CommentSection";

import { getPostList, getPostDetail } from "@/lib/api";
// import { MOCK_POST_LIST, MOCK_POST_DETAIL } from "@/data/demoCommunityPosts";

export default function CommunityPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get("id"); // 상세 여부 구분
  const [filter, setFilter] = useState("전체");

  // 목록 데이터
  const [posts, setPosts] = useState<PostListItem[]>([]);
  // 상세 데이터
  const [post, setPost] = useState<PostDetail | null>(null);

  // 글쓰기 이동
  const handleGoToWrite = () => {
    router.push("./community/write");
  };

  // 목록 불러오기
  useEffect(() => {
    if (!id) {
      (async () => {
        try {
          const data = await getPostList(0, 20);
          setPosts(data.content);
        } catch (err) {
          console.error(err);
          // setPosts(MOCK_POST_LIST);
        }
      })();
    }
  }, [id]);

  // 상세 불러오기
  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const data = await getPostDetail(Number(id));
          setPost(data);
        } catch (err) {
          console.error(err);
          // const mock = MOCK_POST_DETAIL.find((p) => p.id === Number(id));
          // if (mock) setPost(mock);
        }
      })();
    }
  }, [id]);

  // 필터링
  const filteredPosts = useMemo(() => {
    if (filter === "전체") return posts;
    if (filter === "공동구매") return posts.filter((p) => p.category == "GROUP_BUY");
    if (filter.endsWith("구역")) return posts.filter((p) => p.areaTag === filter);
    return posts;
  }, [posts, filter]);

  // -------------------------------
  // 상세 페이지 모드
  // -------------------------------
  if (id) {
    if (!post) return <div>게시글을 찾을 수 없습니다.</div>;
    return (
      <div className={styles.page}>
        <HeaderBack />
        <div className={styles.main}>
          <CommunityPostDetail post={post} />
          <CommentSection postId={post.id} />
        </div>
        <BottomNav active="board" />
      </div>
    );
  }

  // -------------------------------
  // 목록 페이지 모드
  // -------------------------------
  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.main}>
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

        {/* 게시글 목록 */}
        <div>
          {filteredPosts.length === 0 ? (
            <p>조건에 맞는 게시글이 없습니다.</p>
          ) : (
            filteredPosts.map((post) => (
              <PostCardList key={post.id} post={post} />
            ))
          )}
        </div>
      </div>

      {/* 글쓰기 버튼 */}
      <button onClick={handleGoToWrite} className={styles.fab}>
        <AddRoundedIcon />
      </button>

      <BottomNav active="board" />
    </div>
  );
}
