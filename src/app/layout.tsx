import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google'
import Provider from "@/components/providers/Provider";

const fontSans = Poppins({
  subsets: ["latin"],
  weight: ["200","300","400","500","600","700","800","900"],
})

export const metadata: Metadata = {
  title: "ProjecTrack",
  description: "Simplify your project by the better management and efficiency of ProjecTrack.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.className} antialiased bg-myLightFollow dark:bg-myDarkFollow`}
      >
        <Provider>
        {children}
        </Provider>
      </body>
    </html>
  );
}
