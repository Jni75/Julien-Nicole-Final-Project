import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header';
import { App } from '@/components/App';
import '@mysten/dapp-kit/dist/index.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevHub by Jni75',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <App>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </App>
    </html>
  )
}
