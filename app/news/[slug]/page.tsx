import { newsData } from "../../data";
import Image from "next/image";
import Link from "next/link";

export default async function NewsDetail({ params }: { params: Promise<{ slug: string }> }) {

  const resolvedParams = await params;
  const currentIndex = newsData.findIndex((n) => n.slug === resolvedParams.slug);
  const post = currentIndex !== -1 ? newsData[currentIndex] : null;
  const prevPost = currentIndex > 0 ? newsData[currentIndex - 1] : null;
  const nextPost = currentIndex < newsData.length - 1 ? newsData[currentIndex + 1] : null;

  if (!post) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white text-2xl font-bold">
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <main className="bg-gradient-to-b from-black via-purple-950 to-black text-white min-h-screen pt-24 pb-12 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">

        {/* 카테고리 뱃지 */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-pink-500/20 text-pink-400 text-xs font-bold rounded-full border border-pink-500/30">
            공지사항
          </span>
        </div>

        {/* 제목 영역 */}
        <h1 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">{post.title}</h1>

        {/* 메타 정보 바 */}
        <div className="flex items-center gap-4 text-xs md:text-sm text-white/40 pb-4 mb-5 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span>{post.date}</span>
          </div>
          <span className="text-white/20">|</span>
          <span>AROTECH Studio</span>
        </div>

        {/* 썸네일 이미지 */}
        <div className="mb-6 w-full relative aspect-video max-h-[45vh] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(236,72,153,0.15)]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            priority
            className="object-cover"
          />
        </div>

        {/* 본문 */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 md:p-8 mb-6">
          <p className="leading-relaxed whitespace-pre-line text-sm md:text-base text-white/80">
            {post.content.split("\n").map((l) => l.trim()).filter(Boolean).join("\n")}
          </p>
        </div>

        {/* 이전글 / 다음글 네비게이션 */}
        <div className="border-t border-white/10">
          {nextPost && (
            <Link
              href={`/news/${nextPost.slug}`}
              className="flex items-center justify-between px-6 py-5 border-b border-white/10 hover:bg-white/5 transition group"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-white/40 bg-white/10 px-3 py-1 rounded-full">다음글</span>
                <span className="text-white/70 group-hover:text-pink-400 transition font-medium">{nextPost.title}</span>
              </div>
              <span className="text-sm text-white/30">{nextPost.date}</span>
            </Link>
          )}
          {prevPost && (
            <Link
              href={`/news/${prevPost.slug}`}
              className="flex items-center justify-between px-6 py-5 border-b border-white/10 hover:bg-white/5 transition group"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-white/40 bg-white/10 px-3 py-1 rounded-full">이전글</span>
                <span className="text-white/70 group-hover:text-pink-400 transition font-medium">{prevPost.title}</span>
              </div>
              <span className="text-sm text-white/30">{prevPost.date}</span>
            </Link>
          )}
        </div>

        {/* 목록보기 버튼 */}
        <div className="mt-6 text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-pink-400 text-pink-400 font-semibold text-sm hover:bg-pink-500 hover:text-white transition"
          >
            ← 목록보기
          </Link>
        </div>

      </div>
    </main>
  );
}
