// 데모 데이터 (백엔드 연동 전까지 사용)
export const POSTS = [
    {
      id: "p1",
      type: "공동구매",
      region: "3구역",
      title: "3구역 라면 공동구매",
      status: "진행중",
      author: "채연",
      date: "2025. 05. 23 22:50",
      excerpt: "라면 박스 공구 인원 모아요...",
      image: "/shinramen.jpg", // public 폴더에 없으면 자동 회색 플레이스홀더로 표시
      views: 22,
      comments: [
        { id: "c1", author: "발산네구리", text: "참여하고 싶습니다. 어떻게 참여하면 되나요?", date: "05/23 22:50" },
      ],
    },
    {
      id: "p2",
      type: "자유글",
      region: "2구역",
      title: "맛집 추천",
      status: "",
      author: "우장산네구리",
      date: "2025. 05. 23 22:50",
      excerpt: "점심 메뉴 추천 부탁드립니다",
      image: "/cat.jpg",
      views: 31,
      comments: [
        { id: "c2", author: "발산네구리", text: "시험 끝나 후회요~", date: "05/23 22:50" },
      ],
    },
    {
      id: "p3",
      type: "구인",
      region: "1구역",
      title: "서빙 알바 구합니다",
      status: "",
      author: "관리자",
      date: "2025. 05. 21 17:02",
      excerpt: "서빙 오후 알바 구해요",
      image: "",
      views: 12,
      comments: [],
    },
  ];
  export const FILTERS = ["전체", "공동구매", "1구역", "2구역", "3구역", "4구역"];
  