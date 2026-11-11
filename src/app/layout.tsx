import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/shared/Providers";
import { siteConfig } from "@/config/site";
import { chariowDesignSystem } from "@/config/design-system";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: chariowDesignSystem.images.favicon,
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    images: [chariowDesignSystem.images.ogImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${poppins.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
