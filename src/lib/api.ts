// 커뮤니티 댓글 관련

import {
  CommentCreateRequest,
  CommentCreateResponse,
  CommentListResponse,
} from "@/types/community";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

// 댓글 등록
export async function createComment(
  postId: number,
  payload: CommentCreateRequest
): Promise<CommentCreateResponse> {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("댓글 등록 실패");
  return res.json();
}

// 댓글 목록 불러오기
export async function getComments(
  postId: number,
  page: number = 0,
  size: number = 10
): Promise<CommentListResponse> {
  const res = await fetch(
    `${BASE_URL}/posts/${postId}/comments?page=${page}&size=${size}`
  );
  if (!res.ok) throw new Error("댓글 불러오기 실패");
  return res.json();
}

// 커뮤니티 게시글 관련
import {
  PostCreateRequest,
  PostCreateResponse,
  PostListResponse,
  PostDetail,
} from "@/types/community";

// 글 등록
export async function createPost(
  payload: PostCreateRequest
): Promise<PostCreateResponse> {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("글 등록 실패");
  return res.json();
}

// 글 목록
export async function getPostList(
  page: number = 0,
  size: number = 10
): Promise<PostListResponse> {
  const res = await fetch(`${BASE_URL}/posts?page=${page}&size=${size}`);
  if (!res.ok) throw new Error("글 목록 불러오기 실패");
  return res.json();
}

// 글 상세
export async function getPostDetail(id: number): Promise<PostDetail> {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  if (!res.ok) throw new Error("글 상세 불러오기 실패");
  return res.json();
}


// 매물 목록 불러오기
import type { RoomDetail } from "@/types/propertyPost";

export async function getRoomList(): Promise<RoomDetail[]> {
  const res = await fetch(`${BASE_URL}/rooms`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("매물 목록 불러오기 실패");
  }

  return res.json();
}

// 매물 상세 조회
export async function getRoomDetail(
  propertyId: string
): Promise<RoomDetail> {
  const res = await fetch(`${BASE_URL}/rooms/${propertyId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("매물 상세 조회 실패");
  }

  return res.json();
}

// 방 이름으로 검색
export async function searchRoomByName(name: string): Promise<RoomDetail[]> {
  const res = await fetch(`${BASE_URL}/rooms/search?name=${encodeURIComponent(name)}`, {
    method: "POST", 
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("방 이름 검색 실패");
  }

  return res.json();
}
