import CommunityPostDetail from "../Components/CommunityPostDetail";
import { MOCK_POST_LIST, MOCK_POST_DETAIL } from "@/data/demoCommunityPosts";
import styles from "./page.module.css";
import HeaderBack from "@/Components/HeaderBack";
import BottomNav from "@/Components/BottomNav";
import CommentSection from "../Components/CommentSection";

export function generateStaticParams() {
  return MOCK_POST_LIST.map((p) => ({ id: String(p.id) }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CommunityPostPage({ params }: PageProps) {
  const { id } = await params;

  const post = MOCK_POST_DETAIL.find((p) => p.id === Number(id)); 
  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.page}>
      <HeaderBack />
      <div className={styles.main}>
        <CommunityPostDetail post={post} />
        <CommentSection postId={post.id} commentCount={post.commentCount} viewCount={post.viewCount} />
      </div>
      <BottomNav active="map" />
    </div>
  );
}
