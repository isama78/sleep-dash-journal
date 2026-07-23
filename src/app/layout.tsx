import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sleep Dash Journal',
  description: 'Track your sleep entries',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}