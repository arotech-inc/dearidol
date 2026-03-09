import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="bg-gradient-to-b from-black via-purple-950 to-black text-white min-h-screen pt-40 pb-32 px-6">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl md:text-5xl font-bold text-pink-400 mb-2">개인정보처리방침</h1>
        <p className="text-white/40 text-sm mb-12">시행일: 2026년 00월 00일</p>

        <div className="space-y-10 text-white/80 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-pink-500 pl-4">1. 수집하는 개인정보 항목 및 수집 방법</h2>
            <div className="space-y-3 pl-2">
              <p>Dear Idol(이하 "게임")의 원활한 서비스 제공을 위해 유저님의 개인정보를 어떻게 수집하고 보호하는지 안내해 드립니다.</p>
              <div className="bg-white/5 rounded-xl p-5 space-y-3 border border-white/10">
                <p><span className="text-pink-400 font-semibold">필수 항목</span><br />이메일 주소, 비밀번호, 프로듀서명(닉네임), 기기 정보(OS, 기기 식별자), 접속 로그</p>
                <p><span className="text-pink-400 font-semibold">게임 이용 데이터</span><br />아이돌 육성 및 트레이닝 기록, 스테이지 클리어 데이터, 재화 및 아이템(코스튬, 아이돌 카드 등) 보유 현황, 결제 기록</p>
                <p><span className="text-pink-400 font-semibold">선택 항목</span><br />이벤트 경품 배송을 위한 이름, 연락처, 주소 (이벤트 당첨 시 별도 수집)</p>
                <p><span className="text-pink-400 font-semibold">수집 방법</span><br />게임 내 회원가입, SNS 계정 연동, 게임 플레이 및 결제 시 자동 수집</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-pink-500 pl-4">2. 개인정보의 수집 및 이용 목적</h2>
            <div className="bg-white/5 rounded-xl p-5 space-y-3 border border-white/10">
              <p><span className="text-pink-400 font-semibold">게임 서비스 제공</span><br />캐릭터 생성, 게임 플레이 데이터 저장 및 연동, 인앱 결제 및 유료 아이템 지급</p>
              <p><span className="text-pink-400 font-semibold">회원 관리</span><br />본인 식별, 불법 프로그램(매크로 등) 사용 및 비정상적인 플레이 탐지·제재, 고객 문의(CS) 응대</p>
              <p><span className="text-pink-400 font-semibold">마케팅 및 프로모션 (동의 시)</span><br />신규 업데이트, 한정 픽업 이벤트, 사전예약 보상 안내 등</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-pink-500 pl-4">3. 개인정보의 보유 및 이용 기간</h2>
            <p className="mb-4">원칙적으로 회원 탈퇴 시 혹은 개인정보 이용 목적 달성 시 지체 없이 파기합니다. 단, 다음의 정보는 관계 법령에 따라 명시된 기간 동안 보존됩니다.</p>
            <div className="bg-white/5 rounded-xl p-5 space-y-2 border border-white/10">
              <p>• 대금 결제 및 재화 등의 공급에 관한 기록: <span className="text-pink-400">5년</span></p>
              <p>• 소비자의 불만 또는 분쟁 처리에 관한 기록: <span className="text-pink-400">3년</span></p>
              <p>• 부정이용 기록(비정상 플레이, 제재 기록 등): <span className="text-pink-400">1년</span> (재가입 방지 목적)</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-pink-500 pl-4">4. 개인정보의 파기절차 및 방법</h2>
            <p>유저가 회원 탈퇴를 요청하거나 개인정보 보유 기간이 경과한 경우, 복구 및 재생이 불가능한 기술적 방법을 사용하여 해당 정보를 지체 없이 파기합니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-pink-500 pl-4">5. 문의처 (고객센터)</h2>
            <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-2">
              <p>이메일: <span className="text-pink-400">support@dearidol.game</span></p>
              <p>게임 내 [설정] &gt; [고객센터] 메뉴를 통해서도 문의하실 수 있습니다.</p>
            </div>
          </section>

        </div>

        <div className="mt-16 text-center">
          <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-pink-400 text-pink-400 font-semibold text-sm hover:bg-pink-500 hover:text-white transition">
            ← 메인으로
          </Link>
        </div>

      </div>
    </main>
  );
}
