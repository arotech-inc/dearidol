import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="bg-gradient-to-b from-black via-purple-950 to-black text-white min-h-screen pt-40 pb-32 px-6">
      <div className="max-w-3xl mx-auto">

        <div className="mb-10">
          <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-pink-400 text-pink-400 font-semibold text-sm hover:bg-pink-500 hover:text-white transition">
            ← 메인으로
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-pink-400 mb-2">이용약관</h1>
        <p className="text-white/40 text-sm mb-12">시행일: 2026년 00월 00일</p>

        <div className="space-y-10 text-white/80 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-pink-500 pl-4">제 1 조 (목적)</h2>
            <p>본 약관은 AROTECH Studio가 제공하는 모바일/PC 게임 서비스 &quot;Dear Idol&quot;(이하 &quot;게임&quot;) 및 관련 제반 서비스의 이용과 관련하여, 회사와 프로듀서(유저) 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-pink-500 pl-4">제 2 조 (계정 및 데이터의 관리)</h2>
            <div className="bg-white/5 rounded-xl p-5 space-y-3 border border-white/10">
              <p>• 회원은 자신의 계정(SNS 연동 계정 포함)을 안전하게 관리할 책임이 있으며, 타인에게 양도, 대여, 판매할 수 없습니다.</p>
              <p>• 게스트 계정으로 플레이할 경우, 기기 변경이나 앱 삭제 시 아이돌 육성 데이터 및 보유 재화가 소멸될 수 있으며 회사는 이에 대해 책임지지 않습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-pink-500 pl-4">제 3 조 (가상 재화 및 아이템)</h2>
            <div className="bg-white/5 rounded-xl p-5 space-y-3 border border-white/10">
              <p>• 게임 내에서 획득하거나 구매한 가상 재화(다이아, 골드 등), 아이돌 카드, 코스튬 등의 아이템에 대한 소유권 및 지식재산권은 회사에 있으며, 회원에게는 서비스 내에서의 &apos;이용권&apos;만 부여됩니다.</p>
              <p>• 회원은 획득한 아이템을 회사가 정한 방법 외의 방식으로 거래, 환전, 양도할 수 없습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-pink-500 pl-4">제 4 조 (프로듀서(회원)의 금지 행위)</h2>
            <p className="mb-4">회원은 원활한 게임 환경을 위해 다음 행위를 하여서는 안 되며, 적발 시 계정 이용 제한 등의 조치가 취해질 수 있습니다.</p>
            <div className="bg-white/5 rounded-xl p-5 space-y-2 border border-white/10">
              <p>• 불법 프로그램, 매크로 등 비정상적인 방법으로 게임 데이터(재화, 경험치 등)를 조작하는 행위</p>
              <p>• 클라이언트 변조 및 서버 해킹 시도</p>
              <p>• 타인의 권리(명예, 초상권 등)를 침해하거나 불쾌감을 주는 닉네임, 채팅, 프로필 이미지 사용</p>
              <p>• 회사 운영자나 직원을 사칭하는 행위</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-pink-500 pl-4">제 5 조 (서비스의 변경 및 중단)</h2>
            <div className="bg-white/5 rounded-xl p-5 space-y-3 border border-white/10">
              <p>• 회사는 게임의 밸런스 유지, 기획 의도 구현, 버그 수정 등을 위해 게임 내용(아이돌 능력치, 스킬, 아이템 효과 등)을 수정하거나 패치할 수 있습니다.</p>
              <p>• 서버 점검 등의 이유로 게임 접속이 일시 중단될 수 있으며, 이 경우 사전예약 보상이나 기간 한정 이벤트의 기한 연장 등은 회사의 정책에 따라 공지됩니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-pink-500 pl-4">제 6 조 (면책조항)</h2>
            <p>회사는 유저의 디바이스 네트워크 환경 문제, 유저 간의 분쟁, 또는 약관을 위반한 이용으로 인해 발생한 피해에 대해서는 책임을 지지 않습니다.</p>
          </section>

        </div>
      </div>
    </main>
  );
}
