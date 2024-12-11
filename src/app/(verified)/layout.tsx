import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import DashboardNav from "@/components/dashboard/DashboardNav";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AuthContext from "@/components/wrappers/AuthContext";
import { ThemeProvider } from "@/components/wrappers/ThemeProvider";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Projecify",
  description:
    "A Next.js application to manage all your projects and collaborate with your team.",
};

export default function VerifiedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthContext>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <div className="min-h-screen bg-white dark:bg-black">
              {/* Background effects */}
              <div className="fixed inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-grid" />
              <div className="fixed inset-0 bg-gradient-to-b from-white via-white/90 to-white dark:from-black dark:via-black/90 dark:to-black" />
              
              <div className="relative flex h-screen">
                <DashboardNav />
                <div className="flex-1 flex flex-col">
                  <DashboardHeader />
                  <main className="flex-1 overflow-y-auto p-6">
                    {children}
                  </main>
                </div>
              </div>
            </div>
          </ThemeProvider>
        </AuthContext>
      </body>
    </html>
  );
}