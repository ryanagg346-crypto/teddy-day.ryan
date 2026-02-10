import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Setup audio once (runs on mount)
  useEffect(() => {
    audioRef.current = new Audio("/bgmusic.mp3"); // ← public/ folder → /bgmusic.mp3
    audioRef.current.loop = true;                 // keeps playing forever
    audioRef.current.volume = 0.35;               // soft level — adjust 0.1 to 0.6 as needed
    audioRef.current.preload = "auto";            // starts loading early

    // Cleanup when app unmounts (rare, but good practice)
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Start music automatically after first user click anywhere on page
  useEffect(() => {
    if (hasInteracted) return;

    const handleFirstClick = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.warn("Audio play failed:", err);
          // Usually only happens if no real gesture — but click is safe
        });
      }
      setHasInteracted(true);
      // Clean up — no need to listen anymore
      window.removeEventListener("click", handleFirstClick);
    };

    window.addEventListener("click", handleFirstClick);

    return () => {
      window.removeEventListener("click", handleFirstClick);
    };
  }, [hasInteracted]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* Optional tiny music toggle in bottom-right corner (appears after first click) */}
        {hasInteracted && (
          <button
            onClick={() => {
              if (audioRef.current) {
                if (audioRef.current.paused) {
                  audioRef.current.play();
                } else {
                  audioRef.current.pause();
                }
              }
            }}
            className="fixed bottom-5 right-5 z-50 bg-pink-600/80 hover:bg-pink-700 text-white text-xs px-3 py-2 rounded-full shadow-lg backdrop-blur-sm transition-all"
          >
            {audioRef.current?.paused ? "♪ Play Music" : "♫ Pause Music"}
          </button>
        )}

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;