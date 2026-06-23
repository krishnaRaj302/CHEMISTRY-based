import type { Metadata } from "next";
import { Poppins, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nandana K.S | Integrated MSc Chemistry Student & Researcher",
  description: "Welcome to the premium interactive chemistry portfolio of Nandana K.S. Explore laboratory analysis, research projects, academic achievements, and scientific innovation.",
  keywords: "Nandana K.S, Chemistry, MSc Chemistry, Portfolio, Research, Laboratory Analyst, St. Xavier's, Aluva, Alumnus, Analytical Chemistry",
  authors: [{ name: "Nandana K.S" }],
  viewport: "width=device-width, initial-scale=1.0, viewport-fit=cover",
  openGraph: {
    title: "Nandana K.S | Integrated MSc Chemistry Student",
    description: "Young scientist and researcher portfolio focusing on laboratory expertise, analytical chemistry, and chemical safety.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-soft-white text-primary-navy transition-colors duration-500">
        {children}
      </body>
    </html>
  );
}
