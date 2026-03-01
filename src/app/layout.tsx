import type { Metadata } from "next";
import { Agentation } from "agentation";
import "@/styles.css";
import { AnnotationProdiver } from "@/lib/annotation";

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
        <AnnotationProdiver />
      </body>
    </html>
  );
}
