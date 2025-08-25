"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CommunityPostDetail from "./Components/CommunityPostDetail";
import styles from "./page.module.css";
import HeaderBack from "@/Components/HeaderBack";
import BottomNav from "@/Components/BottomNav";
import CommentSection from "./Components/CommentSection";
import { getPostDetail } from "@/lib/api";
import type { PostDetail } from "@/types/community";

export default function CommunityPostPage() {
  const params = useParams<{ id: string }>();
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;

  const [post, setPost] = useState<PostDetail | null>(null);

  useEffect(() => {
    if (!idParam) return;
    (async () => {
      try {
        const data = await getPostDetail(Number(idParam));
        setPost(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [idParam]);

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
