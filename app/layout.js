import {JetBrains_Mono} from "next/font/google";
import {ThemeProvider} from "next-themes";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jetBrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Portfolio - Adty",
    description: "Portfolio of a web developer and Linux user",
};

export default function RootLayout({children}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={`${jetBrainsMono.variable} antialiased dark:bg-zinc-950`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar/>
            {children}
            <Footer/>
        </ThemeProvider>
        </body>
        </html>
    );
}