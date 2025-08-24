import { ReviewResponse } from "@/types/propertyPost";

export const MOCK_REVIEWS: ReviewResponse[] = [
  {
    propertyId:"p1",
    propertyName: "해찬누리",
    author: "홍길동",
    texts: "방이 깔끔하고 집주인분이 친절하세요!",
    grade: 5,
    date: "2025-08-24T12:00:00Z",
  },
  {
    propertyId:"p2",
    propertyName: "장원빌",
    author: "김영희",
    texts: "위치는 좋은데 방음이 조금 아쉽습니다.",
    grade: 3,
    date: "2025-08-24T13:00:00Z",
  },
];
