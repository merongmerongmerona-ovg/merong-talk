import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/store/app-store";
import { ALLOWED_USERS } from "@/constants/users";
import { Zap } from "lucide-react";

export const Route = createFileRoute("/friends")({ component: FriendsPage });

function FriendsPage() {
  const { currentUser, useStamina } = useAppStore();
  const handleSend = (name: string) => {
    if (useStamina(1)) alert(`${name}님에게 스태미나 ⚡를 쐈습니다!`);
    else alert("스태미나 부족! 잭팟 슬롯을 돌리세요.");
  };

  return (
    <div className="p-4 bg-background min-h-screen text-foreground">
      <h1 className="text-2xl font-black mb-6">친구 목록</h1>
      <div className="space-y-4">
        {ALLOWED_USERS.map((f) => (
          <div key={f.id} className="flex items-center justify-between p-4 bg-card rounded-3xl border border-border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="size-12 bg-secondary rounded-2xl flex items-center justify-center text-xl">{f.avatar}</div>
              <div>
                <p className="font-bold text-sm">{f.nickname}</p>
                <p className="text-[10px] text-muted-foreground">@{f.id}</p>
              </div>
            </div>
            {f.id !== currentUser?.id && (
              <button onClick={() => handleSend(f.nickname)} className="bg-secondary p-3 rounded-2xl text-xs font-black flex items-center gap-1 active:scale-95">
                <Zap className="size-3 text-yellow-500 fill-yellow-500" /> 쏘기
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
