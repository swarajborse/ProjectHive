import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ChatBotWidget } from "@/components/chatbot-widget"
import ParticleBackground from "@/components/particle-bg"
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "OSS Mentor AI - Your Gateway to Open Source Contribution",
  description:
    "Learn, explore, and contribute to open source projects with interactive guides, AI assistance, and powerful tools.",
    generator: 'OSS Mentor AI'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ThemeProvider attribute="class" defaultTheme="system">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* Particle background sits behind main UI */}
          <ParticleBackground />
          <Navigation />
          <main className="min-h-screen pt-16 relative z-10">{children}</main>
          <Footer />
          <ChatBotWidget />
        </body>
      </ThemeProvider>
    </html>
  )
}
