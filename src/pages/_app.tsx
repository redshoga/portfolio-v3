import type { AppProps } from "next/app";
import React, { Fragment } from "react";
import { Align } from "../components/Align";
import { useRouter } from "next/router";
import { Container } from "../components/Container";
import { Heading } from "../components/Heading";
import { globals } from "../styles/globals";
import { normalize } from "../styles/normalize";
import { CustomHead } from "../components/CustomHead";

const paddingSize = 120;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <Fragment>
      <CustomHead />

      <Container>
        <Align pb={paddingSize}>
          <Align mt={paddingSize}>
            <Heading nextRouterAsPath={router.asPath} />
          </Align>
          <Align mt={paddingSize}>
            <Component {...pageProps} />
          </Align>
        </Align>
      </Container>

      {globals}
      {normalize}
    </Fragment>
  );
}

export default MyApp;
