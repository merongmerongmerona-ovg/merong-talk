import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "@/index.css";

import { Route as rootRoute } from "./routes/__root";
import { Route as friendsRoute } from "./routes/friends";
import { Route as chatsIndexRoute } from "./routes/chats/index";
import { Route as chatDetailRoute } from "./routes/chats/$id";
import { Route as aiRoute } from "./routes/ai";
import { Route as coinsRoute } from "./routes/coins";
import { Route as toolsRoute } from "./routes/tools";
import { Route as moreRoute } from "./routes/more";

const routeTree = rootRoute.addChildren([
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
