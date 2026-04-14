import { characters } from "../data";
import Image from "next/image";
import Link from "next/link";

export default async function CharacterDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const char = characters.find((c) => c.id === id);

  if (!char) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white text-2xl font-bold">
        캐릭터를 찾을 수 없습니다.
      </div>
    );
  }

  const currentIndex = characters.findIndex((c) => c.id === id);
  const prevChar = currentIndex > 0 ? characters[currentIndex - 1] : null;
  const nextChar = currentIndex < characters.length - 1 ? characters[currentIndex + 1] : null;

  return (
    <main className="bg-gradient-to-b from-black via-purple-950 to-black text-white min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* 상단: 캐릭터 비주얼 + 프로필 */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* 이미지 */}
          <div className={`relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(236,72,153,0.15)] bg-gradient-to-br ${char.color} bg-opacity-20`}>
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
            <Image
              src={char.img}
              alt={char.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className={`object-contain object-bottom origin-bottom drop-shadow-[0_0_30px_rgba(0,0,0,0.5)] ${
                char.id === "haru" || char.id === "yeeun" ? "scale-[1.55]" : "scale-100"
              }`}
            />
            <div className="absolute top-5 left-5">
              <span className={`inline-block px-3 py-1.5 bg-gradient-to-r ${char.color} rounded-full text-xs font-bold text-white shadow-lg`}>
                {char.role}
              </span>
            </div>
          </div>

          {/* 프로필 정보 */}
          <div className="flex flex-col justify-center">
            <p className="text-sm text-pink-400/60 font-semibold tracking-widest uppercase mb-2">{char.nameEn}</p>
            <h1 className="text-5xl md:text-6xl font-bold text-pink-400 mb-2">{char.name}</h1>
            <p className="text-lg text-white/40 mb-8">{char.role}</p>

            <p className="text-white/60 leading-relaxed mb-8 text-lg">{char.intro}</p>

            {/* 프로필 카드 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-pink-400/60 tracking-widest uppercase mb-4">Profile</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(char.profile).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">
                      {key === "age" ? "나이" : key === "height" ? "키" : key === "birthday" ? "생일" : key === "mbti" ? "MBTI" : "특기"}
                    </p>
                    <p className="text-sm text-white font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 스토리 본문 */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className={`w-1 h-10 rounded-full bg-gradient-to-b ${char.color}`} />
            <h2 className="text-2xl font-bold text-white">Story</h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
            <p className="text-white/70 leading-loose whitespace-pre-line text-base">
              {char.story}
            </p>
          </div>
        </div>

        {/* 이전/다음 캐릭터 */}
        <div className="border-t border-white/10 pt-6 mb-10">
          <div className="grid grid-cols-2 gap-4">
            {prevChar ? (
              <Link href={`/characters/${prevChar.id}`} className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/40 transition">
                <div className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br ${prevChar.color}`}>
                  <Image src={prevChar.img} alt={prevChar.name} fill sizes="56px" className="object-contain object-bottom" />
                </div>
                <div>
                  <p className="text-[10px] text-white/30 mb-0.5">이전 캐릭터</p>
                  <p className="font-semibold text-white group-hover:text-pink-300 transition">{prevChar.name}</p>
                </div>
              </Link>
            ) : <div />}
            {nextChar ? (
              <Link href={`/characters/${nextChar.id}`} className="group flex items-center justify-end gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/40 transition text-right">
                <div>
                  <p className="text-[10px] text-white/30 mb-0.5">다음 캐릭터</p>
                  <p className="font-semibold text-white group-hover:text-pink-300 transition">{nextChar.name}</p>
                </div>
                <div className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br ${nextChar.color}`}>
                  <Image src={nextChar.img} alt={nextChar.name} fill sizes="56px" className="object-contain object-bottom" />
                </div>
              </Link>
            ) : <div />}
          </div>
        </div>

        {/* 목록보기 */}
        <div className="text-center">
          <Link href="/#characters" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-pink-400 text-pink-400 font-semibold text-sm hover:bg-pink-500 hover:text-white transition">
            ← 전체 캐릭터 보기
          </Link>
        </div>

      </div>
    </main>
  );
}
