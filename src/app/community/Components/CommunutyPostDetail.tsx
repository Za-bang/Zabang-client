import type { CommunityPost } from "@/types/communityPost";
import styles from "./styles.module.css";

export default function CommunityPostDetail({ post }: { post: CommunityPost }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.content}>{post.contents}</p>
      <div>작성자: {post.author}</div>
      <div>조회수: {post.views}</div>
    </div>
  );
}
