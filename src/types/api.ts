// 게시글 작성 요청
export interface CreatePostRequest {
  title: string;
  content: string;
  tags: string[];
}

// 게시글 응답 (간단 버전)
export interface PostResponse {
  id: string;
  title: string;
  content: string;
  tags: string[];
  author: string;
  date: string;
  views: number;
}
