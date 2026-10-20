import type { Metadata } from "next";
import ShootingStars from "@/components/shooting-stars";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/reference.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Domingo Ancog — Creative Developer",
  description:
    "The portfolio of Domingo Ancog. Explore creative web development, interactive 3D experiments, selected projects, and the tools behind the ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ShootingStars />
        {children}
      </body>
    </html>
  );
}
