import { Inter, JetBrains_Mono, Martian_Mono } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
});

// Display face for the hero name only; the mockup narrows it with the width axis.
export const martianMono = Martian_Mono({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-martian",
});
