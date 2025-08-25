"use client";
import { useState, useEffect } from "react";
import styles from "./communityPostDetail.module.css";
import CommentItemComp from "./CommentItemComp";
// import { MOCK_COMMENTS } from "@/data/demoCommunityPosts";
import type {
  CommentItem,
  CommentCreateRequest,
  CommentCreateResponse,
} from "@/types/community";
import { createComment, getComments } from "@/lib/api";

export default function CommentSection({ postId }: { postId: number }) {
  const [comments, setComments] = useState<CommentItem[]>([]);

  const [input, setInput] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getComments(postId, 0, 20);
        setComments(data.content); 
      } catch (err) {
        console.error(err);

      }
    })();
  }, [postId]);

  const handleAddComment = async () => {
    if (!input.trim()) return;

    const request: CommentCreateRequest = {
      userId: 1, // TODO: 로그인 사용자 ID
      content: input,
    };

    try {
      const data: CommentCreateResponse = await createComment(postId, request);

      const newComment: CommentItem = {
        id: data.id,
        postId,
        userId: request.userId,
        nickname: "우장산너구리", // TODO: 로그인 사용자 닉네임
        content: input,
        createdAt: new Date().toISOString(),
      };

      setComments((prev) => [...prev, newComment]);
      setInput("");
    } catch (err) {
      console.error(err);
      alert("댓글 등록 실패");


      // const newComment: CommentItem = {
      //   id: Date.now(),
      //   postId,
      //   userId: request.userId,
      //   nickname: "우장산너구리",
      //   content: input,
      //   createdAt: new Date().toISOString(),
      // };
      // setComments((prev) => [...prev, newComment]);
      // setInput("");
    }
  };

  return (
    <div className={styles.main}>
      {/* 댓글 목록 */}
      {comments.map((c) => (
        <CommentItemComp key={c.id} {...c} />
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
