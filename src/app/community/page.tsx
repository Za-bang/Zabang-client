"use client";

import { useEffect, useState, useMemo } from "react";
import styles from "./page.module.css";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Header from "@/Components/Header";
import BottomNav from "@/Components/BottomNav";
import { FILTERS } from "@/types/post";
import { useRouter } from "next/navigation";
import type { Post } from "@/types/post";
import PostCardList from "./Components/PostCardList";
import { fetchPosts } from "@/api/posts";

export default function CommunityPage() {
  //카테고리
  const [filter, setFilter] = useState("전체");

  //새로운 게시글 작성
  const router = useRouter();
  const handleGoToWrite = () => {
    router.push("./writePost");
  };

  //게시글 목록 나타내기
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetchPosts().then(setPosts);
  }, []);

  const filteredPosts = useMemo(() => {
    if (filter === "전체") 
      return posts;
    if (filter === "공동구매") 
      return posts.filter((p) => p.purchaseType === true);
    if (filter.endsWith("구역")) 
      return posts.filter((p) => p.region === filter);

    return posts;
  }, [posts, filter]);

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.main}>
        {/* 필터 */}
        <div className={styles.filterRow}>
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`${styles.chip} ${
                filter === f ? styles.chipActive : ""
              }`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        {/*게시글 목록*/}
        <div>
          {(() => {
            if (filteredPosts.length === 0) {
              return <p>조건에 맞는 게시글이 없습니다.</p>;
            } else {
              return filteredPosts.map((post) => (
                <PostCardList key={post.id} post={post} />
              ));
            }
          })()}
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
