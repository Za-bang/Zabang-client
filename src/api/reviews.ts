import { Review } from "@/types/review";

const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    place: "장원빌",
    text: "깨끗하고 조용한 편입니다.",
    date: "2025. 05. 23",
    likes: 2,
    comments: 2,
  },
  {
    id: "r2",
    place: "장원빌",
    text: "깨끗하고 조용한 편입니다.",
    date: "2025. 05. 23",
    likes: 2,
    comments: 2,
  },
  {
    id: "r3",
    place: "장원빌",
    text: "깨끗하고 조용한 편입니다.",
    date: "2025. 05. 23",
    likes: 2,
    comments: 2,
  },
];

export async function fetchReviews(): Promise<Review[]> {
  // return (await fetch("/api/reviews")).json();
  return Promise.resolve(MOCK_REVIEWS);
}

export async function fetchReviewById(id: number): Promise<Review | undefined> {
  // return (await fetch(`/api/reviews/${id}`)).json();
  return Promise.resolve(MOCK_REVIEWS.find((r) => r.id === id));
}
