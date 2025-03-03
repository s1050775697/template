import type { Metadata } from "next";
import { ChakraProvider } from "@chakra-ui/react";
import "../assets/sofia-pro/fonts.css";
import "./globals.css";
import APPWrapper from "@/components/APPWrapper";

export const metadata: Metadata = {
  title: "Travel AI",
  description: "This is Travel AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-svh w-svw overflow-hidden">
      <body className="antialiased h-full w-full">
        <ChakraProvider>
          <APPWrapper>{children}</APPWrapper>
        </ChakraProvider>
      </body>
    </html>
  );
}
