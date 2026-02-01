import "@/styles/globals.css";
import { cn } from "@/lib/utils";

import { Footer, Header, RouteGuard, Providers } from "@/components";
import { fonts, home } from "@/resources";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: home.title,
  description: home.description,
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
      className={cn(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <head>
        <script
          id="theme-init"
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
      <body className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased">
        <Providers>
          {/* Background dots pattern */}
          <div
            className="fixed inset-0 -z-10 opacity-30 dark:opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle, rgb(14 165 233 / 0.3) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="flex flex-col min-h-screen">
            <div className="h-16 hidden sm:block" />
            <Header />
            <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <RouteGuard>{children}</RouteGuard>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
