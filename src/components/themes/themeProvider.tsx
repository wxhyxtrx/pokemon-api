import React from 'react'
import localFont from "next/font/local";
import Head from 'next/head';
import { Toaster } from '../ui/toaster';

const Montserrat = localFont({
    src: "../../pages/fonts/MontserratRegular.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

export default function ThemeProvider({ children }: any) {
    return (
        <>
            <Head>
                <title>Pokemon</title>
                <meta name="description" content="Website Pokemon API" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Toaster />
            <main className={` ${Montserrat.variable} flex items-center justify-center m-auto w-full max-w-screen-xl px-4 sm:px-10 2xl:px-0`}>
                {children}
            </main>
        </>
    )
}
