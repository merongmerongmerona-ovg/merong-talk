import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Send } from "lucide-react";

export const Route = createFileRoute("/ai")({ component: AIPage });

function AIPage() {
  const [msgs, setMsgs] = useState([{ sender: "ai", text: "안녕! 나는 메롱나라 전용 AI 비서야. 무엇이든 물어봐 👅" }]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input;
    setMsgs((prev) => [...prev, { sender: "me", text: userText }]);
    setInput("");

    setTimeout(() => {
      setMsgs((prev) => [
        ...prev,
        { sender: "ai", text: `[AI 분석 결과] '${userText}'(에) 대해 고민 중이시군요! 즉시 해결해 드리겠습니다 🚀` },
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-background text-foreground pb-20">
      <header className="p-2 border-b border-border bg-background flex items-center gap-2 mb-4">
        <Sparkles className="size-5 text-accent" />
        <h1 className="text-lg font-black">메롱 AI 비서</h1>
      </header>

      <div className="flex-1 overflow-y-auto space-y-3">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`p-3 rounded-2xl text-sm max-w-[80%] ${
                m.sender === "me" ? "bg-accent text-accent-foreground" : "bg-card border border-border"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 p-2 bg-card rounded-full mt-2 border border-border">
        <input
          className="flex-1 bg-transparent px-4 text-sm outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="AI에게 명령어 또는 질문 입력..."
        />
        <button onClick={handleSend} className="bg-accent p-2.5 rounded-full text-accent-foreground active:scale-95">
          <Send className="size-4" />
        </button>
      </div>
    </div>
  );
}
