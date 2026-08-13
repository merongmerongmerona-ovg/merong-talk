import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useChatStore } from "@/store/chat-store";
import { useAppStore } from "@/store/app-store";
import { ArrowLeft, Send, Crosshair, Smile } from "lucide-react";

export const Route = createFileRoute("/chats/$id")({ component: ChatRoomDetailPage });

function ChatRoomDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { rooms, sendMessage } = useChatStore();
  const { currentUser, useStamina } = useAppStore();

  const [input, setInput] = useState("");
  const [showTargetDrawer, setShowTargetDrawer] = useState(false);
  const [showEmoticonPicker, setShowEmoticonPicker] = useState(false);

  const room = rooms.find((r) => r.id === id);

  if (!room) {
    return (
      <div className="p-4 text-center">
        <p>존재하지 않는 채팅방입니다.</p>
        <button onClick={() => navigate({ to: "/chats" })} className="mt-4 text-accent font-bold">
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  const handleSend = (textToSend?: string, emoticon?: string) => {
    const text = textToSend || input;
    if (!text.trim() && !emoticon) return;

    sendMessage(room.id, currentUser?.id || "anon", { text, emoticon });
    setInput("");
    setShowEmoticonPicker(false);
  };

  const handleSnipe = () => {
    if (useStamina(3)) {
      alert("🎯 [어둠의 저격 시전] 타겟 유저의 최근 메세지가 즉시 봉인되었습니다!");
      setShowTargetDrawer(false);
    } else {
      alert("스태미나⚡가 부족합니다! (필요량: 3⚡)");
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4">
        <button onClick={() => navigate({ to: "/chats" })} className="p-2">
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="font-black text-sm">{room.name}</h1>
        <button onClick={() => setShowTargetDrawer(!showTargetDrawer)} className="p-2 text-rose-500">
          <Crosshair className="size-5" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {room.messages.map((msg) => {
          const isMe = msg.senderId === currentUser?.id;
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
              <span className="text-[10px] text-muted-foreground mb-1">{msg.senderId}</span>
              <div
                className={`p-3 rounded-2xl text-sm max-w-[75%] ${
                  isMe ? "bg-accent text-accent-foreground" : "bg-card border border-border"
                }`}
              >
                {msg.text}
                {msg.emoticon && <div className="text-3xl mt-1">{msg.emoticon}</div>}
              </div>
            </div>
          );
        })}
      </div>

      {showTargetDrawer && (
        <div className="bg-rose-950/20 border-t border-rose-500 p-4 space-y-3 animate-in slide-in-from-bottom">
          <p className="text-xs font-black text-rose-500 flex items-center gap-1">
            <Crosshair className="size-4" /> 어둠의 저격 시스템 (소모: 3⚡)
          </p>
          <div className="flex justify-between items-center bg-card p-3 rounded-2xl border border-rose-500/30">
            <span className="text-xs font-bold">타겟 선택: 개굴 (frog)</span>
            <button onClick={handleSnipe} className="bg-rose-500 text-white px-3 py-1.5 rounded-xl text-xs font-black">
              저격발사
            </button>
          </div>
        </div>
      )}

      {showEmoticonPicker && (
        <div className="bg-card border-t border-border p-3 grid grid-cols-5 gap-2">
          {["👅", "👑", "😈", "🚀", "⚡"].map((emo) => (
            <button
              key={emo}
              onClick={() => handleSend(undefined, emo)}
              className="text-2xl p-2 hover:bg-secondary rounded-xl"
            >
              {emo}
            </button>
          ))}
        </div>
      )}

      <div className="p-3 border-t border-border bg-background flex items-center gap-2">
        <button onClick={() => setShowEmoticonPicker(!showEmoticonPicker)} className="p-2 text-muted-foreground">
          <Smile className="size-5" />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="메시지 입력..."
          className="flex-1 bg-secondary rounded-full px-4 py-2 text-sm outline-none text-foreground"
        />
        <button onClick={() => handleSend()} className="p-2.5 bg-accent text-accent-foreground rounded-full">
          <Send className="size-4" />
        </button>
      </div>
    </div>
  );
}
