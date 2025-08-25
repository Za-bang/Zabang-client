"use client";

import { useEffect, useState } from "react";
import CommunityPostDetail from "./Components/CommunityPostDetail";
// import { MOCK_POST_DETAIL } from "@/data/demoCommunityPosts";
import styles from "./page.module.css";
import HeaderBack from "@/Components/HeaderBack";
import BottomNav from "@/Components/BottomNav";
import CommentSection from "./Components/CommentSection";
import { getPostDetail } from "@/lib/api";
import type { PostDetail } from "@/types/community";

interface PageProps {
  params: { id: string };
}

export default function CommunityPostPage({ params }: PageProps) {
  const [post, setPost] = useState<PostDetail | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPostDetail(Number(params.id));
        setPost(data);
      } catch (err) {
        console.error(err);
        // const mock = MOCK_POST_DETAIL.find((p) => p.id === Number(params.id));
        // if (mock) setPost(mock);
      }
    })();
  }, [params.id]);

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

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
