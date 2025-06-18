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
        <RecoilRoot>
          {children}
        </RecoilRoot>
      </main>
    </>
  );
}
