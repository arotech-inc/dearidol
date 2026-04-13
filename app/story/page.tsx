import Link from "next/link";

export default function StoryPage() {
  return (
    <main className="bg-gradient-to-b from-black via-purple-950 to-black text-white min-h-screen pt-40 pb-32 px-6">
      <div className="max-w-3xl mx-auto text-center">

        <div className="text-6xl mb-6">🎬</div>
        <h1 className="text-4xl md:text-5xl font-bold text-pink-400 mb-4">Story</h1>
        <p className="text-white/50 mb-2">아이돌 성장 스토리를 준비하고 있습니다.</p>
        <p className="text-white/30 text-sm mb-8">
          스캔들, 화보, CF, 팬사인회, 콘서트 — 아이돌의 모든 여정이<br />
          당신의 선택에 따라 펼쳐집니다.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["스캔들 관리", "화보 촬영", "CF 계약", "팬사인회", "콘서트 진행"].map((tag) => (
            <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-white/40">
              {tag}
            </span>
          ))}
        </div>

        <p className="text-white/20 text-xs mb-8">정식 오픈 시 공지를 통해 안내드릴게요!</p>

        <div className="mt-8">
          <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-pink-400 text-pink-400 font-semibold text-sm hover:bg-pink-500 hover:text-white transition">
            ← 메인으로
          </Link>
        </div>

      </div>
    </main>
  );
}
