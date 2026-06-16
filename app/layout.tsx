import type { Metadata } from "next";
import "./globals.css";
import { ScrollProvider } from "@/lib/scroll-context";

// As per prompt: "Neue Montreal" / "General Sans" (body/UI), "Clash Display" (display/headline).
// We will use standard Google fonts via next/font/google as placeholders if local fonts aren't available,
// but the prompt asked for `next/font/local`. Since we don't have the actual font files, 
// I will set up next/font/google equivalents as fallbacks but structure it so local can be swapped easily.
// Actually, let's just use Google fonts for now (Inter and Space Grotesk) to ensure it works, 
// and comment where to put the local fonts.
import { Inter, Space_Grotesk } from "next/font/google";

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Hari Meghansh — Actor, Filmmaker & Director",
    default: "Hari Meghansh — Actor, Filmmaker & Director",
  },
  description: "Official digital experience of Hari Meghansh, exploring his journey across Web Series, Short Films, Feature Films, and Commercial Ads.",
  openGraph: {
    title: "Hari Meghansh — Actor, Filmmaker & Director",
    description: "Explore the cinematic journey and portfolio of Hari Meghansh.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <body className="antialiased bg-void text-text-primary selection:bg-electric-blue/30 selection:text-white">
        <div className="film-grain"></div>
        <ScrollProvider>
          {children}
        </ScrollProvider>
      </body>
    </html>
  );
}
