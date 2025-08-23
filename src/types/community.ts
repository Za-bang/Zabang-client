// ====================
// 공통 Page 응답 구조
// ====================
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // 현재 페이지 index
  first?: boolean;
  last?: boolean;
  pageable?: any; // 필요하면 세부 정의
}

// ====================
// 게시글 (POSTS)
// ====================

// 글 생성 Request
export interface PostCreateRequest {
  userId: number;
  title: string;
  content: string;
  areaTag: "1구역" | "2구역" | "3구역" | "4구역";
  category: "FREE" | "GROUP_BUY";
  imageUrls?: string[]; // 업로드가 아닌 URL 배열
}

// 글 생성 Response
export interface PostCreateResponse {
  id: number;
}

// 글 목록 Item
export interface PostListItem {
  id: number;
  title: string;
  category: "FREE" | "GROUP_BUY";
  areaTag: "1구역" | "2구역" | "3구역" | "4구역";
  status: "OPEN" | "CLOSED";
  createdAt: string; // "2025.08.21"
  viewCount: number;
  commentCount: number;
  thumbnail?: string;
}

// 글 목록 Response
export type PostListResponse = PageResponse<PostListItem>;

// 글 상세
export interface PostDetail {
  id: number;
  userId: number;
  authorNickname: string;
  title: string;
  content: string;
  category: "FREE" | "GROUP_BUY";
  areaTag: "1구역" | "2구역" | "3구역" | "4구역";
  status: "OPEN" | "CLOSED";
  createdAt: string; // "2025.08.21"
  updatedDate: string | null;
  viewCount: number;
  commentCount: number;
  images: string[]; // 실제 이미지
  imageUrls: string[] | null; // null로 내려올 수도 있음
}

// 글 수정 Request
export interface PostUpdateRequest {
  title?: string;
  content?: string;
  areaTag?: "1구역" | "2구역" | "3구역" | "4구역";
  status?: "OPEN" | "CLOSED";
}

// ====================
// 댓글 (COMMENTS)
// ====================

// 댓글 생성 Request
export interface CommentCreateRequest {
  userId: number;
  content: string;
}

// 댓글 생성 Response
export interface CommentCreateResponse {
  id: number;
}

// 댓글 Item
export interface CommentItem {
  id: number;
  postId: number;
  userId: number;
  nickname: string;
  content: string;
  createdAt: string; // "2025.08.21 12:34"
}

// 댓글 목록 Response
export type CommentListResponse = PageResponse<CommentItem>;

// 댓글 수정 Request
export interface CommentUpdateRequest {
  content: string;
}
