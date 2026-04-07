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
];
