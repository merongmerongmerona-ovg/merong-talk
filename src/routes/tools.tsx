import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Pin } from "lucide-react";

export const Route = createFileRoute("/tools")({ component: ToolsPage });

function ToolsPage() {
  const [query, setQuery] = useState("");
  const tools = [
    { name: "IATA 공항 코드 검색", icon: "✈️", pinned: true },
    { name: "해외 N빵 정산기", icon: "🧾", pinned: true },
    { name: "글자 수 검사기", icon: "📝", pinned: false },
    { name: "단위 변환기", icon: "⚖️", pinned: false },
  ];

  const filteredTools = tools.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 bg-background min-h-screen text-foreground space-y-6 pb-20">
      <h1 className="text-2xl font-black">도구 허브</h1>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="필요한 도구 검색..."
          className="w-full h-12 bg-secondary rounded-2xl pl-11 pr-4 text-sm outline-none text-foreground"
        />
      </div>

      <div>
        <h3 className="text-sm font-black mb-3 flex items-center gap-1.5">
          <Pin className="size-4 text-accent fill-accent" /> 즐겨찾기 도구
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {filteredTools.map((t, i) => (
            <div
              key={i}
              className="bg-card p-4 rounded-3xl border border-border flex items-center gap-3 active:scale-95 transition-transform cursor-pointer"
            >
              <span className="text-2xl">{t.icon}</span>
              <span className="text-xs font-bold">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
