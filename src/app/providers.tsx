"use client";

import DashboardLayout from "@/layout";
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
            <DashboardLayout>{children}</DashboardLayout>
          </SessionProvider>
        </Locales>
      </ThemeCustomization>
    </NextUIProvider>
  );
}
