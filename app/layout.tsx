import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LexMex - Asesor Legal Inteligente',
  description: 'Tu bufete de abogados virtual. Chatbot y biblioteca de consulta de leyes, jurisprudencia y doctrina.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'LexMex'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#0D1117" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body style={{ 
        minHeight: '100vh', 
        maxWidth: '100vw', 
        overflowX: 'hidden',
        background: '#0D1117'
      }}>{children}</body>
    </html>
  )
}
