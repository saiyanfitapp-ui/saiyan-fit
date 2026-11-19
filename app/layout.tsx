import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Saiyan Fit',
  description: 'Alimentazione, palestra e coach Whis',
  manifest: '/manifest.webmanifest',
  appleWebApp: { capable: true, title: 'Saiyan Fit', statusBarStyle: 'black-translucent' },
  icons: { icon: '/icons/icon.svg', apple: '/icons/icon-180.png' }
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#0B1B3F' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
