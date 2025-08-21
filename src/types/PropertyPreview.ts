export interface Money {
  value: number;        // 예: 5100000
  formatted: string;    // 예: "510만원/년" 또는 "5,100,000원"
}

export interface PropertyPre {
  id: string;
  name: string;
  thumbnail: string;    // 이미지 URL
  deposit?: Money;      // 선택
  yearlyRent?: Money;   // 선택
  price?: Money;        // 선택 (단일 가격 필드가 있다면)
  description: string;
  reviewCount: number;  // 리뷰 수
  keywords: string[];   // 추출 키워드
}
