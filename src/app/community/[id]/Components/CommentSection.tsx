"use client";
import { useState } from "react";
import styles from "./communityPostDetail.module.css";
import CommentItem from "./CommentItem";
import { MOCK_COMMENTS } from "@/data/demoCommunityPosts";
import type { CommentItem as CommentItemType } from "@/types/community";

export default function CommentSection({ postId }: {postId:number}) {
  const [comments, setComments] = useState<CommentItemType[]>(
    MOCK_COMMENTS.filter((c) => c.postId === postId)
  );

  const [input, setInput] = useState("");

  const handleAddComment = () => {
    if (!input.trim()) return;

    // 실제 API 요청 시 보낼 Request 타입
    // const request: CommentCreateRequest = {
    //   userId: currentUserId, // 로그인 사용자 ID
    //   content: input,
    // };

    // 임시 댓글 데이터 (서버 응답 흉내)
    const newComment: CommentItemType = {
      id: Date.now(), // 임시 id
      postId,
      userId: 1, // TODO: 로그인 사용자 id 넣기
      nickname: "이남경", // TODO: 로그인 사용자 닉네임 넣기
      content: input,
      createdAt: new Date().toISOString(),
    };

    // 프론트 state에 즉시 반영
    setComments((prev) => [...prev, newComment]);

    // 입력창 초기화
    setInput("");

    // TODO: 나중에 실제 API 요청 추가
    // fetch(`/api/posts/${postId}/comments`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(request),
    // })
    //   .then(res => res.json() as Promise<CommentCreateResponse>)
    //   .then(data => { ... });
  };

  return (
    <div className={styles.main}>
      {/* 댓글 목록 */}
      {comments.map((c) => (
        <CommentItem key={c.id} {...c} />
      ))}

      {/* 댓글 입력 */}
      <div className={styles.commentInput}>
        <input
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="댓글을 입력하세요."
        />
        <button className={styles.sendBtn} onClick={handleAddComment}>
          등록
        </button>
      </div>
    </div>
  );
}
