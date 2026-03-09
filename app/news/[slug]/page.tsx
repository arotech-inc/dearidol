import { newsData } from "../../data";
import Image from "next/image";

export default async function NewsDetail({ params }: { params: Promise<{ slug: string }> }) {
  
  const resolvedParams = await params;
  const post = newsData.find((n) => n.slug === resolvedParams.slug);

  if (!post) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white text-2xl font-bold">
        게시글을 찾을 수 없습니다. 😢
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen text-black p-6 md:p-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <a href="/" className="text-pink-500 font-bold hover:underline">
            ← 목록보기
          </a>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-8">{post.date}</p>

        <div className="mb-10 w-full relative aspect-video">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="rounded-xl object-cover shadow-lg"
          />
        </div>

        <p className="leading-relaxed whitespace-pre-line text-lg text-gray-800">
          {post.content}
        </p>
      </div>
    </main>
  );
}