"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { AccentProvider } from "@/components/accent-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AccentProvider>
        <MotionConfig reducedMotion="user">
          <TooltipProvider delayDuration={150}>
            {children}
            <Toaster position="top-center" richColors />
          </TooltipProvider>
        </MotionConfig>
      </AccentProvider>
    </ThemeProvider>
  );
}
