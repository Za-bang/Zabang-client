// 태그 정의와 더미 매물 데이터

export const TAG_GROUPS = [
  {
    key: "region",
    label: "구역",
    tags: ["1구역", "2구역", "3구역", "4구역"],
  },
  {
    key: "building",
    label: "건물/시설",
    tags: ["건물깨끗", "엘리베이터", "주차장", "CCTV", "보안좋음"],
  },
  {
    key: "room",
    label: "방/실내 환경",
    tags: [
      "분리형원룸",
      "냉난방좋음",
      "채광좋음",
      "환기잘됨",
      "방넓음",
      "인테리어좋음",
      "옵션많음",
      "사진그대로",
    ],
  },
  {
    key: "cost",
    label: "비용/관리",
    tags: ["관리비저렴", "공과금저렴", "가성비좋음"],
  },
  {
    key: "noise",
    label: "소음/주거 환경",
    tags: ["조용한환경", "층간소음없음", "벽간소음없음"],
  },
  {
    key: "landlord",
    label: "임대인/관리자",
    tags: ["임대인친절", "문제대응빠름", "소통원활"],
  },
  {
    key: "etc",
    label: "기타",
    tags: ["반려동물가능", "입주편리", "가격대비만족"],
  },
];

// 더미 매물 4개 (이미지 포함/미포함 섞어둠)
export const LISTINGS = [
  {
    id: "L1",
    name: "미소빌",
    address: "충청남도 아산시 신창면 순천향로 15번길 8",
    region: "3구역",
    deposit: "30만원",
    yearly: "400만원",
    maintenance: "3만원",
    jeonse: "해당없음",
    parking: "8대",
    area_m2: 19.9,
    area_pyeong: 6.0,
    images: [
      "https://images.unsplash.com/photo-1616597095323-9fa8f3f62a1f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1200&auto=format&fit=crop",
    ],
    tags: [
      "3구역",
      "건물깨끗",
      "엘리베이터",
      "주차장",
      "CCTV",
      "분리형원룸",
      "채광좋음",
      "환기잘됨",
      "관리비저렴",
      "조용한환경",
      "임대인친절",
      "문제대응빠름",
      "소통원활",
      "가격대비만족",
    ],
    reviews: [
      { id: "r1", author: "우장산너구리", date: "05/23 22:50 · 2구역", text: "깨끗하고 조용한 편입니다." },
      { id: "r2", author: "발산너구리", date: "05/23 22:50 · 1구역", text: "사진이랑 거의 똑같아요." },
    ],
  },
  {
    id: "L2",
    name: "라임하우스",
    address: "서울특별시 관악구 낙성대동 100-3",
    region: "1구역",
    deposit: "50만원",
    yearly: "480만원",
    maintenance: "4만원",
    jeonse: "해당없음",
    parking: "2대",
    area_m2: 21.4,
    area_pyeong: 6.5,
    images: [], // 이미지 없음 -> 목록에서 제목만
    tags: [
      "1구역",
      "건물깨끗",
      "CCTV",
      "방넓음",
      "인테리어좋음",
      "옵션많음",
      "가성비좋음",
      "층간소음없음",
      "임대인친절",
    ],
    reviews: [{ id: "r1", author: "익명", date: "05/21 17:02 · 1구역", text: "역세권이고 방이 넓어요." }],
  },
  {
    id: "L3",
    name: "온유리원룸",
    address: "대전광역시 유성구 어은동 25-4",
    region: "2구역",
    deposit: "20만원",
    yearly: "360만원",
    maintenance: "2만원",
    jeonse: "해당없음",
    parking: "6대",
    area_m2: 18.2,
    area_pyeong: 5.5,
    images: [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop",
    ],
    tags: [
      "2구역",
      "엘리베이터",
      "주차장",
      "분리형원룸",
      "환기잘됨",
      "관리비저렴",
      "조용한환경",
      "소통원활",
      "입주편리",
    ],
    reviews: [],
  },
  {
    id: "L4",
    name: "하이큐브",
    address: "부산광역시 부산진구 전포대로 120",
    region: "4구역",
    deposit: "80만원",
    yearly: "520만원",
    maintenance: "별도",
    jeonse: "해당없음",
    parking: "없음",
    area_m2: 22.0,
    area_pyeong: 6.7,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop",
    ],
    tags: [
      "4구역",
      "건물깨끗",
      "CCTV",
      "채광좋음",
      "인테리어좋음",
      "가성비좋음",
      "벽간소음없음",
      "문제대응빠름",
      "반려동물가능",
    ],
    reviews: [{ id: "r1", author: "익명", date: "05/22 09:18 · 4구역", text: "반려동물 가능해서 좋아요." }],
  },
];

// 선택한 모든 태그를 포함하는 매물만 반환(AND 필터)
export function filterListings(selected = []) {
  const need = selected.filter(Boolean);
  if (!need.length) return LISTINGS;
  return LISTINGS.filter((L) => need.every((t) => L.tags.includes(t)));
}
