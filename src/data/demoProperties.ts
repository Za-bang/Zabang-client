import {RoomOptions, RoomDetail, ReviewResponse } from "@/types/propertyPost";

// 방 옵션 (RoomOptions) 예시
const roomOptions1: RoomOptions = {
  airConditioner: true,
  refrigerator: true,
  washingMachine: true,
  dryer: false,
  pet: false,
  bed: true,
  microwave: true,
  balcony: true,
  fireProtection: true,
  gas: true,
  wifi: true,
  cctv: true,
  parkingLot: false,
  latitude: 37.12345,
  longitude: 127.98765,
};

const roomOptions2: RoomOptions = {
  airConditioner: false,
  refrigerator: true,
  washingMachine: true,
  dryer: true,
  pet: true,
  bed: false,
  microwave: false,
  balcony: false,
  fireProtection: true,
  gas: true,
  wifi: false,
  cctv: true,
  parkingLot: true,
  latitude: 37.56789,
  longitude: 126.54321,
};

// 매물 상세 (RoomDetail) 예시
export const MOCK_ROOM_DETAILS: RoomDetail[] = [
  {
    propertyId:"p1",
    name: "해찬누리",
    imagePath: ["/images/room1.jpg"], 
    deposit: 300,
    rentPrice: "월세 35만",
    wide: 18,
    address: "충남 아산시 신창면 순천향로 22",
    area: "1",
    phoneNumber: "010-1234-5678",
    options: roomOptions1
  },
  {
    propertyId:"p2",
    name: "장원빌",
    imagePath: ["/images/room2.jpg"], 
    deposit: 1000,
    rentPrice: "전세 1억 2천",
    wide: 45,
    address: "충남 아산시 온양동 123-4",
    area: "2",
    phoneNumber: "010-9876-5432",
    options: roomOptions2,
  },
];


// 리뷰 응답 (ReviewResponse) 예시
export const MOCK_PROPERTY_POST: ReviewResponse[] = [
  {
    propertyId:"p1",
    propertyName: "해찬누리",
    author: "홍길동",
    texts: "방이 깔끔하고 집주인분이 친절하세요!",
    grade: 5,
    date: "2025-08-20T14:30:00Z",
    imagePath: ["/images/review1.jpg"],
  },
  {
    propertyId:"p2",
    propertyName: "장원빌",
    author: "김영희",
    texts: "위치는 좋은데 방음이 조금 아쉽습니다.",
    grade: 3,
    date: "2025-08-21T09:10:00Z",
  },
];

import type { ReviewAIResult } from "@/types/propertyPost";

export const MOCK_PROPERTY_AI: ReviewAIResult[] = [
  {
    propertyId: "p1",
    keywords: ["+방넓음", "+인테리어", "-냉난방"],
    // summary: "장점: 방이 넓고 인테리어가 예쁨. 단점: 냉난방이 약함. 종합: 쾌적하지만 냉난방 성능은 아쉬움."
  },
  {
    propertyId: "p2",
    keywords: ["+조용한환경", "-보안"],
    // summary: "장점: 주변이 조용해 공부하기 좋음. 단점: 보안이 부족해 불안함. 종합: 학업 환경에는 적합하나 안전은 보완 필요."
  },
];
