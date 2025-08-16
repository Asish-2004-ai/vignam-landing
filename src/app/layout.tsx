import type { Metadata } from 'next';
import MuiProvider from '@/components/MuiProvider';

export const metadata: Metadata = {
  title: 'Vignam — Landing',
  description: 'Assignment build with Next + MUI + R3F',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MuiProvider>{children}</MuiProvider>
      </body>
    </html>
  );
}
