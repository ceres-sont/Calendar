import type React from "react"
import { NotesProvider } from "@/app/hooks/use-notes"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Calendar App",
  description: "A calendar application with note-taking capabilities",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotesProvider>{children}</NotesProvider>
      </body>
    </html>
  )
}
