'use client'

import Image from 'next/image';
import Button from '../components/ui/Button/Button';
import Footer from '../components/ui/Footer/Footer';
import { Analytics } from '@vercel/analytics/react';
import Header from '../components/ui/Header/Header';
import { inter } from '../fonts/fonts';

const GlobalError = ({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) => (
    <html lang="en" className={inter.className}>
        <body className="min-h-screen flex justify-between flex-col">
        <Header />
        <main className="mx-auto flex max-w-7xl items-center justify-center p-6 lg:px-8 flex-col scroll-smooth mb-auto w-full">
        <Image
                className="ml-2"
                src="/icons/error.svg"
                alt="Not found icon"
                height="140"
                width="140"
            />
            <h2 className="m-5 text-sm">Something went wrong, we are working on it.</h2>
            <div className='flex gap-5'>
                <Button label="Try again" onClick={() => reset()} type="primary" />
                <Button label="Go back home" href="/" />
            </div>
            <Analytics />
        </main>
        <Footer />
        </body>
    </html>
);

export default GlobalError;
