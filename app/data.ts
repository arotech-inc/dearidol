export type NewsCategory = "notice" | "event" | "update";

export const newsData: {
  slug: string;
  title: string;
  date: string;
  image: string;
  category: NewsCategory;
  content: string;
}[] = [
  {
    slug: "pre-registration-open",
    title: "사전예약 시작 안내",
    date: "2026-07-01",
    image: "/dearidol-hero.jpg",
    category: "notice",
    content: `
    Dear Idol 글로벌 사전예약이 시작되었습니다.
    지금 사전예약에 참여하고 특별 보상을 받아보세요!
    `,
  },
  {
    slug: "official-trailer-release",
    title: "공식 트레일러 공개",
    date: "2026-05-25",
    image: "/dearidol-feature2.jpg",
    category: "notice",
    content: `
    Dear Idol의 첫 공식 트레일러가 공개되었습니다.
    새로운 아이돌 세계를 확인해보세요!
    `,
  },
  {
    slug: "service-terms-update",
    title: "서비스 이용약관 개정 안내",
    date: "2026-06-20",
    image: "/dearidol-feature1.jpg",
    category: "notice",
    content: `
    Dear Idol 서비스 이용약관이 개정되었습니다.
    변경된 내용을 확인해주세요.
    `,
  },
  {
    slug: "summer-event-2026",
    title: "여름 한정 이벤트 오픈",
    date: "2026-07-10",
    image: "/dearidol-feature3.jpg",
    category: "event",
    content: `
    뜨거운 여름! 한정 의상과 다이아 보상을 받을 수 있는 이벤트가 진행됩니다.
    지금 바로 참여하세요!
    `,
  },
  {
    slug: "attendance-event",
    title: "7일 출석 이벤트 진행",
    date: "2026-07-05",
    image: "/dearidol-feature2.jpg",
    category: "event",
    content: `
    매일 접속하고 풍성한 보상을 받아가세요.
    7일 연속 출석 시 SR 카드 지급!
    `,
  },
  {
    slug: "fan-art-contest",
    title: "팬아트 컨테스트 개최",
    date: "2026-06-15",
    image: "/dearidol-feature1.jpg",
    category: "event",
    content: `
    Dear Idol 팬아트 컨테스트가 시작됩니다.
    참여자 전원에게 특별 보상이 지급됩니다.
    `,
  },
  {
    slug: "v1-1-update",
    title: "v1.1 업데이트 노트",
    date: "2026-07-15",
    image: "/dearidol-feature3.jpg",
    category: "update",
    content: `
    신규 아이돌 추가, 밸런스 조정, 버그 수정 등 다양한 개선사항이 적용되었습니다.
    `,
  },
  {
    slug: "stage-system-update",
    title: "무대 연출 시스템 업데이트",
    date: "2026-06-30",
    image: "/dearidol-feature1.jpg",
    category: "update",
    content: `
    더욱 화려해진 무대 연출 시스템을 만나보세요!
    새로운 카메라 워크와 이펙트가 추가되었습니다.
    `,
  },
  {
    slug: "training-improvement",
    title: "트레이닝 시스템 개선",
    date: "2026-06-10",
    image: "/dearidol-feature2.jpg",
    category: "update",
    content: `
    트레이닝 효율 상승 및 신규 트레이닝 메뉴가 추가되었습니다.
    `,
  },
  {
    slug: "server-maintenance",
    title: "정기 서버 점검 안내",
    date: "2026-06-05",
    image: "/dearidol-hero.jpg",
    category: "notice",
    content: `
    원활한 서비스 제공을 위해 정기 점검이 진행됩니다.
    이용에 참고 부탁드립니다.
    `,
  },
  {
    slug: "collab-event",
    title: "콜라보 이벤트 사전 안내",
    date: "2026-05-30",
    image: "/dearidol-feature3.jpg",
    category: "event",
    content: `
    유명 아티스트와의 콜라보 이벤트가 곧 시작됩니다.
    많은 관심 부탁드립니다!
    `,
  },
];
