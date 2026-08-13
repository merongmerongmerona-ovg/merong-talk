import { createFileRoute, Link } from "@tanstack/react-router";
import { useChatStore } from "@/store/chat-store";
import { MessageCircle, Pin } from "lucide-react";

export const Route = createFileRoute("/chats/")({ component: ChatListPage });

function ChatListPage() {
  const { rooms } = useChatStore();

  return (
    <div className="p-4 bg-background min-h-screen text-foreground">
      <h1 className="text-2xl font-black mb-6">채팅</h1>
      <div className="space-y-3">
        {rooms.map((room) => {
          const lastMsg = room.messages[room.messages.length - 1];
          return (
            <Link
              key={room.id}
              to="/chats/$id"
              params={{ id: room.id }}
              className="flex items-center justify-between p-4 bg-card rounded-3xl border border-border shadow-sm active:scale-98 transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="size-12 bg-accent/20 rounded-2xl flex items-center justify-center text-xl text-accent">
                  <MessageCircle className="size-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-sm">{room.name}</p>
                    {room.pinned && <Pin className="size-3 text-accent fill-accent" />}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                    {lastMsg ? lastMsg.text : "대화 내용이 없습니다."}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
