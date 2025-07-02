"use client";

import { RecoilRoot } from "recoil";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      
      <main>
          {children}
      </main>
    </>
  );
}
