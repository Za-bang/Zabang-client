"use client";
import styles from "./communityPostDetail.module.css";
import CommentItem from "./CommentItem";
import { MOCK_COMMENTS } from "@/data/demoCommunityPosts";

type CommentSectionProps = {
  postId: number;
  commentCount: number;
  viewCount: number;
};

export default function CommentSection({
  postId,
  commentCount,
  viewCount,
}: CommentSectionProps) {
  return (
    <div className={styles.main}>
      {MOCK_COMMENTS.filter((c) => c.postId === postId).map((c) => (
        <CommentItem key={c.id} {...c} />
      ))}

      <div className={styles.commentInput}>
        <input className={styles.input} placeholder="댓글을 입력하세요." />
        <button className={styles.sendBtn}>등록</button>
      </div>
    </div>
  );
}
