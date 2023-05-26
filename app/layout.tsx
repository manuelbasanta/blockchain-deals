import '../styles/globals.scss';
import { inter } from "../fonts/fonts";
import { Metadata } from 'next';
import Header from '../components/ui/Header/Header';

export const metadata: Metadata = {
  title: {
    absolute: 'Blockchain Deals',
    template: '%s | Blockchain Deals',
  },
};

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en" className={inter.className}>
        <body>
          <Header />
          <div className="mx-auto flex max-w-7xl items-center justify-center p-6 lg:px-8">
            {children}
          </div>
        </body>
      </html>
    );
  }