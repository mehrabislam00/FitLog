import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Logo from "@/app/assets/logo.png";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import WorkoutProvider from "@/context/workoutContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog | Workout Library",
  description: "Browse workouts and keep track of your training plan.",
  icons: {
    icon: Logo.src,
    shortcut: Logo.src,
    apple: Logo.src,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme ="light"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <WorkoutProvider>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ToastContainer />
        </WorkoutProvider>
        
      </body>
    </html>
  );
}
