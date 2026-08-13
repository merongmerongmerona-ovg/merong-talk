import { create } from "zustand";

export interface Message {
  id: string;
  senderId: string;
  text: string;
  emoticon?: string;
  timestamp: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  pinned: boolean;
  messages: Message[];
}

interface ChatState {
  rooms: ChatRoom[];
  sendMessage: (roomId: string, senderId: string, content: { text?: string; emoticon?: string }) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  rooms: [
    {
      id: "general",
      name: "🔥 메롱 메인 단톡방",
      pinned: true,
      messages: [
        {
          id: "1",
          senderId: "merong_777",
          text: "메롱톡 개설 완료! 👅 다들 접속해라",
          timestamp: "오전 10:00",
        },
      ],
    },
    {
      id: "secret",
      name: "😈 비밀 음모방",
      pinned: false,
      messages: [
        {
          id: "1",
          senderId: "frog",
          text: "여기선 저격 금지다 개굴.. 🐸",
          timestamp: "오전 11:20",
        },
      ],
    },
  ],
  sendMessage: (roomId, senderId, content) =>
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              messages: [
                ...room.messages,
                {
                  id: Date.now().toString(),
                  senderId,
                  text: content.text || "",
                  emoticon: content.emoticon,
                  timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
                },
              ],
            }
          : room
      ),
    })),
}));
