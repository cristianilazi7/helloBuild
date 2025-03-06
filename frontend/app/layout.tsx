'use client';
import { Inter } from 'next/font/google';
import './globals.css';

import { ThemeModeScript } from 'flowbite-react';
import { Providers } from './store/Providers';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={inter.className}>
        {/* We render a client component (Providers) in a server component */}
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
