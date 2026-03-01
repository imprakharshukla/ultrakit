import type { Metadata } from "next";
import "@/styles.css";

export const metadata: Metadata = {
  title: "UltraKit",
  description:
    "Next.js 16 + Tailwind v4 + shadcn base-nova + AI Elements starter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
