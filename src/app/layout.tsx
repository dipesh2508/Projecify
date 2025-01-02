import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import AuthContext from "@/components/wrappers/AuthContext"
import { ThemeProvider } from "@/components/wrappers/ThemeProvider"
import { Toaster } from "@/components/ui/toaster"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://projecify.tryntest.in'),
  title: "Projecify - Project Management & Team Collaboration Tool",
  description: "Streamline your project management with Projecify. Real-time collaboration, task tracking, team management, and project analytics all in one intuitive platform.",
  keywords: ["project management", "team collaboration", "task tracking", "agile", "project planning", "team productivity", "tryntest", "dipesh ranjan", "tryntest.in"],
  authors: [{ name: "Dipesh Ranjan" }],
  creator: "Dipesh Ranjan",
  publisher: "Try N Test Foundation Inc",
  openGraph: {
    title: "Projecify - Project Management & Team Collaboration Tool",
    description: "Streamline your project management with Projecify. Real-time collaboration, task tracking, team management, and project analytics all in one intuitive platform.",
    url: 'https://projecify.tryntest.in',
    type: "website",
    siteName: "Projecify",
    locale: "en_US",
  },
  twitter: {
    title: "Projecify - Project Management & Team Collaboration Tool",
    description: "Streamline your project management with Projecify. Real-time collaboration, task tracking, team management, and project analytics all in one intuitive platform.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

const GoogleAnalytics = () => {
  if (!GA_MEASUREMENT_ID) return null
  
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <GoogleAnalytics />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthContext>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthContext>
      </body>
    </html>
  )
}