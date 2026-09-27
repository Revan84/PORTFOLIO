import { Inter, JetBrains_Mono, Martian_Mono } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
});

// Display face for the hero name only.
export const martianMono = Martian_Mono({ subsets: ["latin"], variable: "--font-martian" });
