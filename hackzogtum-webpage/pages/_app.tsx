import '../styles/index.css'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import { AppProps } from 'next/dist/shared/lib/router/router';
config.autoAddCss = false;

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
