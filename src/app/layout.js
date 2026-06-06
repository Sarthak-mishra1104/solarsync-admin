import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SolarSync Admin | Smart Solar CRM",

  description:
    "Manage solar leads, site visits, proposals, customers and sales from one intelligent dashboard.",

  applicationName: "SolarSync Admin",

  creator: "Intellisys Technologies",

  keywords: [
    "Solar CRM",
    "Solar Dashboard",
    "Lead Management",
    "SolarSync",
    "Solar Business",
    "Solar Analytics",
  ],

  

  openGraph: {
    title: "SolarSync Admin",
    description:
      "Smart Solar CRM & Lead Management Platform",
    siteName: "SolarSync",
    type: "website",
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="
          min-h-screen
          bg-gradient-to-br
          from-slate-50
          via-white
          to-green-50
          text-slate-900
          antialiased
        "
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

