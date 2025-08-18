import type { Post } from "@/types/post";

// 실제 API로 교체해서 쓰면 됨
const MOCK: Post[] = [
  {
    id: "p1",
    purchaseType: true,
    region: "3구역",
    title: "3구역 라면 공동구매",
    purchaseStatus:true,
    author: "채연",
    date: "2025-08-09T12:10:00Z",
    contents: "라면 박스 공구 인원 모아요...",
    image: "",
    views: 22,
    comments: [
      { id: "c1", author: "발산네구리", text: "참여하고 싶습니다. 어떻게 참여하면 되나요?", date: "05/23 22:50" },
    ],
  },
    {    id: "p2",
      purchaseType: false,
      region: "2구역",
      title: "맛집 추천",
      purchaseStatus: false,
      author: "우장산네구리",
      date: "2025-08-09T12:10:00Z",
      contents: "점심 메뉴 추천 부탁드립니다",
      image: "",
      views: 31,
      comments: [
        { id: "c2", author: "발산네구리", text: "시험 끝나 후회요~", date: "05/23 22:50" },
      ],
    },
    {
      id: "p3",
      purchaseType: false,
      region: "1구역",
      title: "서빙 알바 구합니다 꿀알바 누구나 가능 망설이지 말고 지원하세요",
      purchaseStatus: false,
      author: "관리자",
      date: "2025-08-09T12:10:00Z",
      contents: "서빙 오후 알바 구해요 꿀알바 누구나 가능 망설이지 말고 지원하세요",
      image: "",
      views: 12,
      comments: [],
    },
    {
    id: "p4",
    purchaseType: true,
    region: "3구역",
    title: "3구역 라면 공동구매",
    purchaseStatus:false,
    author: "채연",
    date: "2025-08-09T12:10:00Z",
    contents: "라면 박스 공구 인원 모아요...",
    image: "",
    views: 22,
    comments: [
      { id: "c1", author: "발산네구리", text: "참여하고 싶습니다. 어떻게 참여하면 되나요?", date: "05/23 22:50" },
    ],
  },
];

export async function fetchPosts(): Promise<Post[]> {
  // return (await fetch("/api/posts")).json();
  return Promise.resolve(MOCK);
}

export async function fetchPostById(id: string): Promise<Post | undefined> {
  // return (await fetch(`/api/posts/${id}`)).json();
  return Promise.resolve(MOCK.find(p => p.id === id));
}
