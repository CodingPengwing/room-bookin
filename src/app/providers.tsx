"use client";

import ThemeCustomization from "@/themes";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import Locales from "@/components/Locales";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <NextUIProvider>
      <ThemeCustomization>
        <Locales>
          <SessionProvider>
            {children}
          </SessionProvider>
        </Locales>
      </ThemeCustomization>
    </NextUIProvider>
  );
}
