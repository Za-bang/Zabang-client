import type { PostDetail, PostListItem, CommentItem } from "@/types/community";

// 목록 예시
export const MOCK_POST_LIST: PostListItem[] = [
  {
    id: 1,
    title: "3구역 라면 공동구매",
    category: "GROUP_BUY",
    areaTag: "3구역",
    status: "OPEN",
    createdAt: "2025.08.21",
    viewCount: 12,
    commentCount: 2,
    thumbnail: "https://picsum.photos/300/200?random=1",
  },
  {
    id: 2,
    title: "오늘 점심 뭐 먹을까요?",
    category: "FREE",
    areaTag: "2구역",
    status: "OPEN",
    createdAt: "2025.08.20",
    viewCount: 33,
    commentCount: 1,
    thumbnail: "https://picsum.photos/300/200?random=2",
  },
];

// 상세 예시
export const MOCK_POST_DETAIL: PostDetail[] = [
  {
    id: 1,
    userId: 101,
    authorNickname: "채연",
    title: "3구역 라면 공동구매",
    content: "라면 박스로 공동구매할 분 구합니다!",
    category: "GROUP_BUY",
    areaTag: "3구역",
    status: "OPEN",
    createdAt: "2025.08.21",
    updatedDate: null,
    viewCount: 13,
    commentCount: 2,
    images: [
      "https://picsum.photos/400/300?random=11",
      "https://picsum.photos/400/300?random=12",
    ],
    imageUrls: null,
  },
  {
    id: 2,
    userId: 102,
    authorNickname: "민수",
    title: "오늘 점심 뭐 먹을까요?",
    content: "점심 추천 부탁드립니다!",
    category: "FREE",
    areaTag: "2구역",
    status: "OPEN",
    createdAt: "2025.08.20",
    updatedDate: null,
    viewCount: 33,
    commentCount: 1,
    images: ["https://picsum.photos/400/300?random=21"],
    imageUrls: null,
  },
];

// 댓글 예시
export const MOCK_COMMENTS: CommentItem[] = [
  {
    id: 101,
    postId: 1,
    userId: 201,
    nickname: "정연",
    content: "저 참여하고 싶어요!",
    createdAt: "2025.08.21 12:34",
  },
];
