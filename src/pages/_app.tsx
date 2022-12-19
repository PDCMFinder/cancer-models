import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Merriweather } from "@next/font/google";
import { Space_Mono } from "@next/font/google";

const merriweather = Merriweather({
  weight: "400",
});
const spaceMono = Space_Mono({
  weight: ["400", "700"],
});

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --type-primary: ${merriweather.style.fontFamily}, serif;
          --type-secondary: ${spaceMono.style.fontFamily}, monospace;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
