import type { Metadata } from 'next'
import { Noto_Serif, Noto_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSerif = Noto_Serif({ 
  subsets: ["latin"],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
});

const notoSans = Noto_Sans({ 
  subsets: ["latin"],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'AAPI Heritage Club | Lincoln High School',
  description: 'Celebrating Asian American and Pacific Islander culture, heritage, and community at Lincoln High School. Join us for cultural events, discussions, and community service.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${notoSans.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
