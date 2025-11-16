import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TopNav, BottomNav } from "./components/Navigation";
import Index from "./pages/Index";
import IntegrityVault from "./pages/IntegrityVault";
import TrustProfile from "./pages/TrustProfile";
import SilentWatch from "./pages/SilentWatch";
import InsightBoard from "./pages/InsightBoard";
import SecureExchange from "./pages/SecureExchange";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen w-full bg-background">
          <TopNav />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/integrity-vault" element={<IntegrityVault />} />
            <Route path="/trust-profile" element={<TrustProfile />} />
            <Route path="/silent-watch" element={<SilentWatch />} />
            <Route path="/insight-board" element={<InsightBoard />} />
            <Route path="/secure-exchange" element={<SecureExchange />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
