import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { Users, MessageCircle, Sparkles, Coins, Wrench, MoreHorizontal } from "lucide-react";

export const Route = createRootRoute({
  component: RootLayout,
});

const NAV_ITEMS = [
  { id: "friends", label: "친구", icon: Users, to: "/friends" },
  { id: "chats", label: "채팅", icon: MessageCircle, to: "/chats" },
  { id: "ai", label: "AI", icon: Sparkles, to: "/ai" },
  { id: "coins", label: "코인", icon: Coins, to: "/coins" },
  { id: "tools", label: "도구", icon: Wrench, to: "/tools" },
  { id: "more", label: "기타", icon: MoreHorizontal, to: "/more" },
];

function RootLayout() {
  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <nav className="sticky bottom-0 z-50 flex h-14 items-center justify-between border-t border-border bg-background/90 px-4 backdrop-blur">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.id}
            to={item.to}
            className="group flex flex-1 flex-col items-center gap-1 transition-colors text-muted-foreground hover:text-foreground"
          >
            <item.icon className="size-5 transition-transform group-active:scale-90" />
            <span className="text-[10px] font-bold">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
