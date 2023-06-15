import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/css";
import Header from "./home/header";
import Footer from "./home/footer";
import Auth from "./auth";
import AppContext from "./context";
import ToastProvider from "../hook/use-toast";
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta charSet="UTF-8" />

        <meta name="author" content="ICANTECH" />
        <meta property="og:type" content="website" />

        <meta property="og:site_name" content="ICANTECH Club" />
        <link rel="icon" href="/favicon-ican.png" />
      </head>

      {process.env.MODE === "PRODUCTION" && (
        <>
          <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-S1TKYBFMTZ'); 
        `}
          </Script>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-S1TKYBFMTZ" strategy="afterInteractive" />
        </>
      )}
      <body>
        <ToastProvider>
          <AppContext>
            <Auth />
            <Header />
            {children}
            <Footer />
          </AppContext>
        </ToastProvider>
      </body>
    </html>
  );
}

export const dynamic = "auto";
// export const dynamicParams = true;
// export const revalidate = 180;
