import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TodoME - Gestión de Tareas Impulsada por IA",
  description: "Organiza tu vida con inteligencia artificial. TodoME combina la simplicidad de una lista de tareas tradicional con el poder de la IA para ayudarte a ser más productivo, organizado y eficiente.",
  keywords: ["todo", "tareas", "productividad", "IA", "inteligencia artificial", "organización", "gestión de proyectos"],
  authors: [{ name: "TodoME Team" }],
  creator: "TodoME",
  publisher: "TodoME",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://todome.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TodoME - Gestión de Tareas Impulsada por IA",
    description: "Organiza tu vida con inteligencia artificial. TodoME combina la simplicidad de una lista de tareas tradicional con el poder de la IA para ayudarte a ser más productivo.",
    url: "https://todome.com",
    siteName: "TodoME",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TodoME - Gestión de Tareas con IA",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TodoME - Gestión de Tareas Impulsada por IA",
    description: "Organiza tu vida con inteligencia artificial. TodoME combina la simplicidad de una lista de tareas tradicional con el poder de la IA.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          {children}
          <Toaster />
      </body>
    </html>
  );
}
