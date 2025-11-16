import type { Metadata } from 'next';
import ClientLayout from './ClientLayout';
import "./globals.css";

export const metadata: Metadata = {
  title: 'WeCare',
  icons: {
    icon: '/favicon.svg',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <ClientLayout>{children}</ClientLayout>
    </html>
  );
}