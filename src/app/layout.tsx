import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header/Header";

export const metadata: Metadata = {
  title: "Shop Project",
  description: "Next.js shop",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <Header />
        <main style={{ maxWidth: 1100, margin: "0 auto", padding: "1rem" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
