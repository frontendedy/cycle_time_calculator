import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cycle Time Calculator | Leo Precision - Injection Molding Production Calculator",
  description: "Professional cycle time calculator for injection molding. Calculate production units per hour, day, week, and month based on cavity mold and cycle time. Free tool by Leo Precision for manufacturing efficiency.",
  keywords: [
    "cycle time calculator",
    "injection molding calculator",
    "production calculator",
    "manufacturing efficiency",
    "cavity mold calculator",
    "Leo Precision",
    "molding cycle time",
    "production planning",
    "manufacturing tools",
    "plastic injection molding"
  ],
  authors: [{ name: "Leo Precision" }],
  creator: "Leo Precision",
  publisher: "Leo Precision",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cycle-time-calculator-jade.vercel.app'), // Update this with your actual domain
  openGraph: {
    title: "Cycle Time Calculator | Leo Precision",
    description: "Calculate injection molding production efficiency with our professional cycle time calculator. Determine units per hour, day, week, and month.",
    url: 'https://cycle-time-calculator-jade.vercel.app', // Update this with your actual domain
    siteName: 'Leo Precision Cycle Time Calculator',
    images: [
      {
        url: '/logo.jpg', // This will be your logo for social sharing
        width: 1200,
        height: 630,
        alt: 'Leo Precision Cycle Time Calculator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cycle Time Calculator | Leo Precision',
    description: 'Professional injection molding cycle time calculator. Calculate production efficiency and planning.',
    images: ['/logo.jpg'], // This will be your logo for Twitter sharing
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here if needed
    // google: 'your-google-verification-code',
  },
  category: 'technology',
  classification: 'Manufacturing Tools',
  referrer: 'origin-when-cross-origin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo.jpg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Leo Precision Calculator" />
        
        {/* Additional SEO meta tags */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        
        {/* Structured data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Leo Precision Cycle Time Calculator",
              "url": "https://cycle-calculator-leo-precision.vercel.app", // Update with your actual domain
              "description": "Professional cycle time calculator for injection molding production planning",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Leo Precision"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
