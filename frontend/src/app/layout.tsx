import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { ToastContainer } from "react-toastify";
import { LoginProvider } from "@/components/login/LoginContext";
import { LoadingProvider } from "@/components/loading/loadingContext";
import { UserLikesProvider } from "@/components/post/UserLikesContext";
import { UserBookmarkProvider } from "@/components/post/UserBookmarkContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InTempo app",
  description: "Social media app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingProvider>
            <LoginProvider>
              <UserLikesProvider>
                <UserBookmarkProvider>{children}</UserBookmarkProvider>
              </UserLikesProvider>
            </LoginProvider>
          </LoadingProvider>
        </ThemeProvider>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          draggable={false}
          closeOnClick={true}
          pauseOnHover={true}
        />
      </body>
    </html>
  );
}
