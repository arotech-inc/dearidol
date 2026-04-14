"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { newsData } from "../data";

const categories = [
  { id: "all", label: "전체" },
  { id: "notice", label: "공지사항" },
  { id: "event", label: "이벤트" },
  { id: "update", label: "업데이트" },
] as const;

const categoryLabel: Record<string, string> = {
  notice: "공지사항",
  event: "이벤트",
  update: "업데이트",
};

const PAGE_SIZE = 5;

export default function NewsListPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredNews = useMemo(() => {
    if (activeCategory === "all") return newsData;
    return newsData.filter((n) => n.category === activeCategory);
  }, [activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredNews.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pagedNews = filteredNews.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setCurrentPage(1);
  };

  return (
    <main className="bg-gradient-to-b from-black via-purple-950 to-black text-white min-h-screen pt-40 pb-32 px-6 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-40 left-10 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 right-10 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* 헤더 */}
        <div className="mb-12">
          <p className="text-sm text-pink-400/60 font-semibold tracking-widest uppercase mb-3">News & Events</p>
          <h1 className="text-4xl md:text-5xl font-bold text-pink-400 mb-4">News</h1>
          <p className="text-white/50">Dear Idol의 최신 소식을 확인하세요.</p>
        </div>

        {/* 카테고리 탭 */}
        <div className="flex gap-2 flex-wrap mb-10 border-b border-white/10 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)]"
                  : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 뉴스 리스트 (가로형) */}
        <div className="space-y-4">
          {pagedNews.length === 0 && (
            <div className="text-center text-white/40 py-20">
              해당 카테고리의 글이 없습니다.
            </div>
          )}
          {pagedNews.map((item, i) => (
            <Link
              key={item.slug}
              href={`/news/${item.slug}`}
              className="group flex flex-col md:flex-row items-stretch gap-0 md:gap-6 bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-pink-500/40 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] transition duration-300"
            >
              {/* 썸네일 */}
              <div className="relative w-full md:w-72 h-52 md:h-44 shrink-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 288px"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 md:to-transparent" />
                {/* 뱃지 */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-pink-500/90 backdrop-blur text-white text-xs font-bold rounded-full">
                    {categoryLabel[item.category]}
                  </span>
                </div>
              </div>

              {/* 텍스트 */}
              <div className="flex-1 flex flex-col justify-between p-6 md:py-6 md:pr-8 md:pl-0 min-w-0">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-pink-400/80 tracking-wider">NEWS #{String(i + 1).padStart(3, "0")}</span>
                    <span className="text-white/20">|</span>
                    <span className="text-xs text-white/40">{item.date}</span>
                  </div>
                  <h2 className="font-bold text-xl md:text-2xl text-white group-hover:text-pink-300 transition mb-3 leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-sm text-white/50 line-clamp-2 leading-relaxed">
                    {item.content.trim().slice(0, 80)}...
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                  <span className="text-xs text-white/40">AROTECH Studio</span>
                  <span className="inline-flex items-center gap-1 text-pink-400 text-sm font-semibold group-hover:gap-2 transition-all">
                    자세히 보기 <span>→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full font-bold transition ${
                  safePage === page
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)]"
                    : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              →
            </button>
          </div>
        )}

        {/* 메인으로 버튼 */}
        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-pink-400 text-pink-400 font-semibold text-sm hover:bg-pink-500 hover:text-white transition">
            ← 메인으로
          </Link>
        </div>

      </div>
    </main>
  );
}
