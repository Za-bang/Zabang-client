import CommunityPostDetail from "./CommunityPostDetail";
import CommentSection from "./CommentSection";
import styles from "../page.module.css";
import HeaderBack from "@/Components/HeaderBack";
import BottomNav from "@/Components/BottomNav";

import { getPostList, getPostDetail } from "@/lib/api";
import type { PostDetail } from "@/types/community";

// 정적 경로 생성
export async function generateStaticParams() {
  try {
    const data = await getPostList(0, 20);
    return data.content.map((p) => ({ id: String(p.id) }));
  } catch (err) {
    console.error("⚠️ 게시글 목록 가져오기 실패:", err);
    return [];
  }
}

// 상세 페이지
export default async function CommunityPostPage({
  params,
}: {
  params: { id: string };
}) {
  let post: PostDetail | null = null;

  try {
    post = await getPostDetail(Number(params.id));
  } catch (err) {
    console.error("⚠️ 게시글 상세 불러오기 실패:", err);
  }

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
      <BottomNav active="board" />
    </div>
  );
}
