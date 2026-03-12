import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { prefetchLoader } from "@/lib/loader";

const queryClient = new QueryClient();

prefetchLoader();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Router />
    <Analytics />
  </QueryClientProvider>,
);
