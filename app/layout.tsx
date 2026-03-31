import './tuabogadoia-premium.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TuAbogadoIA - Asesor Legal Inteligente',
  description: 'Tu bufete de abogados virtual con inteligencia artificial. Consultas, expedientes y automatización legal.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'TuAbogadoIA'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" style={{ height: '100vh', overflow: 'hidden' }}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#0a0d14" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+Pro:wght@300;400;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body style={{ 
        height: '100vh', 
        width: '100vw', 
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        background: '#0a0d14',
        position: 'fixed'
      }}>{children}</body>
    </html>
  )
}
