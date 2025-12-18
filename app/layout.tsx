import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import Header from "../components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dnd 4th Edition",
  description: "Dnd 4th edition character builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
