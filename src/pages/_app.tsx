import type { AppProps } from "next/app";
import React, { Fragment } from "react";
import { Align } from "../components/Align";
import { useRouter } from "next/router";
import { Container } from "../components/Container";
import { Heading } from "../components/Heading";
import { globals } from "../styles/globals";
import { normalize } from "../styles/normalize";
import { CustomHead } from "../components/CustomHead";
import { GoogleAnalytics } from "../components/GoogleAnalytics";
import Head from "next/head";

const paddingSize = 120;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <Fragment>
      <CustomHead />
      <GoogleAnalytics />
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.Userback = window.Userback || {};
Userback.access_token = '11366|23785|KobUFR3NbJaqHm6GDi70bU0sk';
(function(d) {
    var s = d.createElement('script');s.async = true;
    s.src = 'https://static.userback.io/widget/v1.js';
    (d.head || d.body).appendChild(s);
})(document);
          `,
          }}
        />
      </Head>

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
