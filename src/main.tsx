import React from "react";
import ReactDOM from "react-dom/client";
import { createRouter, RouterProvider, createRoute } from "@tanstack/react-router";
import "@/index.css";

import { Route as rootRoute } from "./routes/__root";
import { Route as loginFile } from "./routes/login";
import { Route as friendsFile } from "./routes/friends";
import { Route as chatsIndexFile } from "./routes/chats/index";
import { Route as chatDetailFile } from "./routes/chats/$id";
import { Route as aiFile } from "./routes/ai";
import { Route as coinsFile } from "./routes/coins";
import { Route as toolsFile } from "./routes/tools";
import { Route as moreFile } from "./routes/more";

// 에러가 나지 않도록 라우트 트리를 안전하게 수동 재구성했습니다!
const loginRoute = createRoute({ getParentRoute: () => rootRoute, path: "/", component: loginFile.options.component });
const friendsRoute = createRoute({ getParentRoute: () => rootRoute, path: "/friends", component: friendsFile.options.component });
const chatsIndexRoute = createRoute({ getParentRoute: () => rootRoute, path: "/chats", component: chatsIndexFile.options.component });
const chatDetailRoute = createRoute({ getParentRoute: () => rootRoute, path: "/chats/$id", component: chatDetailFile.options.component });
const aiRoute = createRoute({ getParentRoute: () => rootRoute, path: "/ai", component: aiFile.options.component });
const coinsRoute = createRoute({ getParentRoute: () => rootRoute, path: "/coins", component: coinsFile.options.component });
const toolsRoute = createRoute({ getParentRoute: () => rootRoute, path: "/tools", component: toolsFile.options.component });
const moreRoute = createRoute({ getParentRoute: () => rootRoute, path: "/more", component: moreFile.options.component });

const routeTree = rootRoute.addChildren([
  loginRoute,
  friendsRoute,
  chatsIndexRoute,
  chatDetailRoute,
  aiRoute,
  coinsRoute,
  toolsRoute,
  moreRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
