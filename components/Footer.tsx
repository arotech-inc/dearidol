import Link from "next/link";

export default function DearIdolFooter() {
  return (
    <footer className="py-20 border-t border-white/10 bg-black text-white relative z-10">
      <div className="text-center mb-10">
        {/* 회사 메인(aerotech.co.kr)으로 돌아가는 링크 */}
        <Link href="https://corporate-xi-six.vercel.app/" className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-pink-500/40 hover:bg-pink-500 hover:text-white transition">
          <span className="text-xl">←</span> Back to AROTECH
        </Link>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-6 text-sm opacity-70 text-center">
        <a href="#" className="hover:text-pink-400">개인정보처리방침</a>
        <a href="#" className="hover:text-pink-400">이용약관</a>
        <Link href="/cs" className="hover:text-pink-400">고객센터</Link>
      </div>
      <p className="mt-10 text-center text-xs opacity-50">© 2026 AROTECH Studio. All rights reserved.</p>
    </footer>
  );
}