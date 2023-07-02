"use client"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
import { ChakraProvider } from '@chakra-ui/react'
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <ChakraProvider>{children}</ChakraProvider>
            </body>
        </html>
    )
}
