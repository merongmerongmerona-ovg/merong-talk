import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAppStore } from "@/store/app-store";
import { ALLOWED_USERS } from "@/constants/users";
import { Terminal, Sparkles, Users, LogOut } from "lucide-react";

export const Route = createFileRoute("/more")({ component: MorePage });

function MorePage() {
  const { currentUser, login, logout, updateCoins } = useAppStore();
  const navigate = useNavigate();

  const [clickCount, setClickCount] = useState(0);
  const [isDevMode, setIsDevMode] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [logs, setLogs] = useState<string[]>([
    "[System] 메롱 AI 개발자 대기 중... 무엇이든 코드로 만들어 드립니다 👅",
  ]);

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  const switchAccount = (id: string, pw: string) => {
    login(id, pw);
    window.location.reload();
  };

  const handleTitleClick = () => {
    setClickCount((prev) => prev + 1);
    if (clickCount >= 4) {
      setIsDevMode(true);
      alert("👅 AI 개발자(오너) 콘솔 활성화됨.");
    }
  };

  const handleAICommand = () => {
    if (!prompt.trim()) return;
    const userCmd = prompt;
    setLogs((prev) => [...prev, `> ${userCmd}`]);
    setPrompt("");

    setTimeout(() => {
      let aiReply = "[AI 빌드 완료] 명령을 수행했습니다!";
      if (userCmd.includes("돈") || userCmd.includes("코인")) {
        updateCoins(500000);
        aiReply = "💰 [코드 자동수정] 지갑 잔액 지급 로직을 강제로 500,000 MRG 추가하도록 패치했습니다!";
      } else if (userCmd.includes("주가") || userCmd.includes("떡상")) {
        aiReply = "📈 [코드 자동수정] 메롱증권 호가창 변동 함수를 조작하여 전 종목 상한가 직행 코드를 주입했습니다!";
      } else {
        aiReply = `⚙️ [Hot-fix] "${userCmd}" 요청 반영 완료. 앱을 재부팅할 필요 없습니다!`;
      }
      setLogs((prev) => [...prev, aiReply]);
    }, 800);
  };

  return (
    <div className="flex min-h-full flex-col bg-background p-4 pb-20 text-foreground space-y-6">
      <h1 className="text-2xl font-black">설정</h1>

      <div
        onClick={handleTitleClick}
        className="flex items-center gap-4 rounded-3xl bg-card p-5 border border-border shadow-sm cursor-pointer active:scale-98 transition-transform"
      >
        <div className="flex size-14 items-center justify-center rounded-2xl bg-accent text-3xl">
          {currentUser?.avatar}
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-black">{currentUser?.nickname}</h2>
          <p className="text-xs text-muted-foreground">@{currentUser?.id}</p>
        </div>
      </div>

      {isDevMode && (
        <div className="rounded-3xl bg-black p-5 text-green-400 font-mono shadow-2xl border-2 border-green-500">
          <div className="flex items-center gap-2 mb-3 border-b border-green-800 pb-2">
            <Terminal className="size-5 text-green-400" />
            <span className="text-sm font-black">AI 실시간 코드 주입 콘솔</span>
          </div>
          <div className="h-32 overflow-y-auto space-y-1 text-xs mb-3 bg-zinc-900 p-3 rounded-2xl border border-green-900">
            {logs.map((log, idx) => (
              <p key={idx} className="leading-relaxed">{log}</p>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAICommand()}
              placeholder="예: 코인 50만개 추가해줘"
              className="flex-1 bg-zinc-900 border border-green-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
            />
            <button
              onClick={handleAICommand}
              className="bg-green-500 text-black px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1 active:scale-95"
            >
              <Sparkles className="size-3" /> 실행
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <p className="text-xs font-bold text-muted-foreground uppercase px-1">계정 스위칭 (다른 유저 빙의)</p>
        <div className="rounded-3xl bg-card border border-border overflow-hidden divide-y divide-border">
          {ALLOWED_USERS.filter((u) => u.id !== currentUser?.id).map((user) => (
            <button
              key={user.id}
              onClick={() => switchAccount(user.id, user.password)}
              className="flex w-full items-center justify-between p-4 hover:bg-secondary/50 text-left"
            >
              <div className="flex items-center gap-3">
                <Users className="size-4 text-muted-foreground" />
                <span className="text-xs font-bold">{user.nickname} (으)로 스위칭</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-500/10 p-4 text-xs font-bold text-rose-500"
      >
        <LogOut className="size-4" /> 로그아웃
      </button>
    </div>
  );
}
