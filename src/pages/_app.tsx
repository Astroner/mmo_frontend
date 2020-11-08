import { AppProps } from "next/app";

import "./global.scss";
import "normalize.css";

export default function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
