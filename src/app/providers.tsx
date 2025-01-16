"use client";

import ThemeCustomization from "@/themes";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import Locales from "@/components/Locales";
import Notistack from "@/components/third-party/Notistack";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <NextUIProvider>
      <ThemeCustomization>
        <Locales>
          <SessionProvider>
            <Notistack>{children}</Notistack>
          </SessionProvider>
        </Locales>
      </ThemeCustomization>
    </NextUIProvider>
  );
}
