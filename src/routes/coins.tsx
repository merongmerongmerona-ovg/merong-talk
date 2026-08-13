import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/store/app-store";
import { Wallet, TrendingUp, Dices, Gamepad2, Zap } from "lucide-react";

export const Route = createFileRoute("/coins")({ component: CoinsPage });

function CoinsPage() {
  const { coins, stamina } = useAppStore();

  return (
    <div className="p-4 bg-background min-h-screen text-foreground space-y-6 pb-20">
      <h1 className="text-2xl font-black">코인 & 자산</h1>

      <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
        <div className="flex justify-between items-center mb-2 text-muted-foreground">
          <span className="text-xs font-bold flex items-center gap-1">
            <Wallet className="size-4" /> 메롱 페이
          </span>
          <span className="text-xs font-bold flex items-center gap-1 text-yellow-500">
            <Zap className="size-3 fill-yellow-500" /> {stamina} ⚡
          </span>
        </div>
        <p className="text-3xl font-black">
          {coins.toLocaleString()} <span className="text-base text-muted-foreground font-normal">MRG</span>
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-black flex items-center gap-2">
          <TrendingUp className="size-4 text-red-500" /> 메롱 증권 실시간 호가
        </h3>
        <div className="space-y-2">
          <div className="bg-card p-4 rounded-2xl flex justify-between items-center border border-border">
            <div>
              <p className="font-bold text-sm">메롱전자</p>
              <p className="text-[10px] text-muted-foreground">국민주식 👅</p>
            </div>
            <div className="text-right">
              <p className="font-black text-sm">8,200 C</p>
              <p className="text-xs text-red-500 font-bold">+15.2% 🚀</p>
            </div>
          </div>

          <div className="bg-card p-4 rounded-2xl flex justify-between items-center border border-border">
            <div>
              <p className="font-bold text-sm">메롱바이오</p>
              <p className="text-[10px] text-muted-foreground">초고위험</p>
            </div>
            <div className="text-right">
              <p className="font-black text-sm">34,100 C</p>
              <p className="text-xs text-blue-500 font-bold">-8.4% 📉</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="bg-card p-5 rounded-3xl border border-border flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform">
          <Dices className="size-8 text-rose-500" />
          <span className="font-bold text-xs">잭팟 슬롯머신</span>
        </button>
        <button className="bg-card p-5 rounded-3xl border border-border flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform">
          <Gamepad2 className="size-8 text-accent" />
          <span className="font-bold text-xs">메롱 러너</span>
        </button>
      </div>
    </div>
  );
}
