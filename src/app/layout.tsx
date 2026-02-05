import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { fontSans, fontHeading, fontMono } from "@/lib/fonts";
import Script from "next/script";

import { Footer, Header, RouteGuard, Providers } from "@/components";
import { home, person } from "@/resources";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: home.title,
    template: `%s | ${person.name}`,
  },
  description: home.description,
  keywords: [
    "Full Stack Developer",
    "Computer Vision Engineer",
    "Machine Learning",
    "PyTorch",
    "Next.js",
    "React",
    "Node.js",
    "Self-Supervised Learning",
    "Deep Learning",
    person.name,
  ],
  authors: [{ name: person.name, url: "https://shahzebx.dev" }],
  creator: person.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shahzebx.dev",
    title: home.title,
    description: home.description,
    siteName: person.name,
  },
  twitter: {
    card: "summary_large_image",
    title: home.title,
    description: home.description,
    creator: "@shahzebx",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(fontSans.variable, fontHeading.variable, fontMono.variable)}
    >
      <head suppressHydrationWarning>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
                  const savedTheme = localStorage.getItem('theme');
                  
                  const resolveTheme = (themeValue) => {
                    if (!themeValue || themeValue === 'system') {
                      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    return themeValue;
                  };
                  
                  const resolvedTheme = resolveTheme(savedTheme);
                  root.classList.add(resolvedTheme);
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-yellow-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 antialiased">
        <Providers>
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-600 focus:text-white focus:rounded-lg focus:shadow-lg"
          >
            Skip to main content
          </a>

          {/* Subtle gradient background */}
          <div
            className="fixed inset-0 -z-10 bg-gradient-to-br from-yellow-50 via-white to-yellow-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950"
            aria-hidden="true"
          />

          {/* Subtle grid pattern */}
          <div
            className="fixed inset-0 -z-10 opacity-[0.015] dark:opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle, rgb(20 184 166 / 0.4) 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col min-h-screen">
            <div className="h-16 hidden sm:block" aria-hidden="true" />
            <Header />
            <main id="main-content" className="flex-1 w-full">
              <RouteGuard>{children}</RouteGuard>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
