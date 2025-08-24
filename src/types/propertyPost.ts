export interface RoomOptions {
  airConditioner: boolean;
  refrigerator: boolean;
  washingMachine: boolean;
  dryer: boolean;
  pet: boolean;
  bed: boolean;
  microwave: boolean;
  balcony: boolean;
  fireProtection: boolean;
  gas: boolean;
  wifi: boolean;
  cctv: boolean;
  parkingLot: boolean;
  latitude: number;
  longitude: number;
}

export interface RoomDetail {
  propertyId: string;
  name: string; // 매물 이름
  imagePath: string[]; // 대표 이미지
  deposit: number; // 보증금 (단위: 만원?)
  rentPrice: string; // 월세/년세 등 문자열
  wide: number; // 면적 (평수 or m²)
  address: string; // 주소
  area: string; // 구역 ("1", "2", "3", "4")
  phoneNumber: string; // 연락처
  options: RoomOptions; // 세부 옵션
}

// 리뷰 생성 요청(Request)
export interface ReviewRequest {
  propertyId: string;
  propertyName: string; // 매물 이름
  rating: number; // 별점 (1~5)
  content: string; // 리뷰 내용
  author: string; // 작성자
}

// 리뷰 응답(Response)
export interface ReviewResponse {
  propertyId: string;
  propertyName: string; // 매물 이름
  author: string; // 작성자
  texts: string; // 리뷰 본문 (백엔드에서 content → texts로 내려옴)
  grade: number; // 평점
  date: string; // 작성 날짜 (ISO String)
  imagePath?: string[]; // 리뷰 이미지 (없을 수도 있음)
}

// AI
export interface ReviewAIResult {
  propertyId: string;
  keywords: string[];
  summary: string;
}
