import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAppStore } from "@/store/app-store";
import { ShieldAlert, Check } from "lucide-react";

// 루트('/') 경로 진입 시 로그인 페이지가 뜨도록 지정
export const Route = createFileRoute("/")({ component: LoginRoute });

function LoginRoute() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [showPermissions, setShowPermissions] = useState(false);
  const { login } = useAppStore();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (id === "merong_777" || id === "test2" || id === "frog" || id === "yunjjang") {
      login(id, pw);
      setShowPermissions(true);
    } else {
      alert("누구냐 넌? 👅 정보가 틀렸어!");
    }
  };

  if (showPermissions) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background p-6 text-foreground">
        <ShieldAlert className="size-16 text-accent mb-4" />
        <h1 className="text-xl font-black mb-2">필수 권한 허용</h1>
        <p className="text-sm text-muted-foreground mb-8 text-center">
          메롱톡의 모든 어둠의 저격 및 알림을 위해<br/>권한을 허용해 줘!
        </p>
        <div className="w-full space-y-3 mb-8">
          {["마이크 (음성 메시지)", "푸시 알림 (백그라운드 수신)", "로컬 AI 연산"].map((p) => (
            <div key={p} className="flex items-center gap-3 bg-secondary p-4 rounded-2xl">
              <Check className="size-5 text-emerald-500" />
              <span className="font-bold text-sm">{p}</span>
            </div>
          ))}
        </div>
        <button 
          onClick={() => navigate({ to: "/chats" })}
          className="w-full bg-accent text-accent-foreground py-4 rounded-2xl font-black text-lg active:scale-95 transition-transform"
        >
          전부 허용하고 시작하기 🚀
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col justify-center px-6 bg-background text-foreground">
      <div className="text-center mb-10">
        <div className="text-6xl mb-4">👅</div>
        <h1 className="text-3xl font-black">메롱톡</h1>
      </div>
      <input 
        className="mb-3 w-full rounded-2xl bg-secondary p-4 outline-none text-foreground" 
        placeholder="아이디 (merong_777, test2, frog, yunjjang)" value={id} onChange={(e) => setId(e.target.value)} 
      />
      <input 
        className="mb-6 w-full rounded-2xl bg-secondary p-4 outline-none text-foreground" 
        type="password" placeholder="비밀번호 (123)" value={pw} onChange={(e) => setPw(e.target.value)} 
      />
      <button onClick={handleLogin} className="w-full bg-foreground text-background py-4 rounded-2xl font-black">
        접속하기
      </button>
    </div>
  );
}
