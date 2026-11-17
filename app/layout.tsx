import type { Metadata, Viewport } from 'next';
import './globals.css';
import './mobile.css';

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#fffaf5' };

export const metadata: Metadata = {
  title: 'Birthday Storybook | A Little World of Surprises',
  description: 'A customizable birthday storybook filled with memories, wishes, and interactive surprises.',
  robots: { index: false, follow: false, noarchive: true, nosnippet: true, noimageindex: true, googleBot: { index: false, follow: false, noarchive: true, nosnippet: true, noimageindex: true } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
