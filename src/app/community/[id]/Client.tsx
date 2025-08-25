"use client";

import { useEffect, useState } from "react";
import CommunityPostDetail from "./Components/CommunityPostDetail";
import styles from "./page.module.css";
import HeaderBack from "@/Components/HeaderBack";
import BottomNav from "@/Components/BottomNav";
import CommentSection from "./Components/CommentSection";
import { getPostDetail } from "@/lib/api";
import type { PostDetail } from "@/types/community";

export default function Client({ id }: { id: string }) {
  const [post, setPost] = useState<PostDetail | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPostDetail(Number(id));
        setPost(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className={styles.page}>
      <HeaderBack />
      <div className={styles.main}>
        <CommunityPostDetail post={post} />
        <CommentSection postId={post.id} />
      </div>
      <BottomNav active="map" />
    </div>
  );
}
