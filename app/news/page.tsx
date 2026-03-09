import Link from "next/link";
import Image from "next/image";
import { newsData } from "../data";

export default function NewsListPage() {
  return (
    <main className="bg-gradient-to-b from-black via-purple-950 to-black text-white min-h-screen pt-40 pb-32 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-pink-400 text-pink-400 font-semibold text-sm hover:bg-pink-500 hover:text-white transition mb-8 inline-block">
            ← 메인으로
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-pink-400 mb-4">News</h1>
          <p className="opacity-60">Dear Idol의 최신 소식을 확인하세요.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsData.map((item) => (
            <Link
              key={item.slug}
              href={`/news/${item.slug}`}
              className="group bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 hover:scale-105 transition duration-300"
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <p className="text-sm opacity-60 mb-2">{item.date}</p>
                <h2 className="font-semibold text-lg">{item.title}</h2>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
