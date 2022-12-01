import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Merriweather } from "@next/font/google";
import { Space_Mono } from "@next/font/google";

const merriweather = Merriweather({
  weight: "400",
  subsets: ["latin"],
});
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --type-primary: ${merriweather.style.fontFamily};
          --type-secondary: ${spaceMono.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
