import type { AppProps } from "next/app";
import { Fragment } from "react";
import { globals } from "../styles/globals";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Component {...pageProps} />
      {globals}
    </Fragment>
  );
}

export default MyApp;
