"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../page.module.css";
import HeaderBack from "@/Components/HeaderBack";
import BottomNav from "@/Components/BottomNav";
import CommunityPostDetail from "./CommunityPostDetail";
import CommentSection from "./CommentSection";
import { getPostDetail } from "@/lib/api";
import type { PostDetail } from "@/types/community";

export default function CommunityPostPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // URL에서 ?id= 값 읽기
  const [post, setPost] = useState<PostDetail | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await getPostDetail(Number(id));
        setPost(data);
      } catch (err) {
        console.error("⚠️ 게시글 상세 불러오기 실패:", err);
      }
    })();
  }, [id]);

  if (!id) return <div>잘못된 접근입니다.</div>;
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
