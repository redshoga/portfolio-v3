import React from "react";
import Head from "next/head";
import meta from "../../blog/config/meta.json";

export const GoogleAnalytics = () => (
  <Head>
    <script
      async
      defer
      src={`https://www.googletagmanager.com/gtag/js?id=${meta.googleAnalyticsId}`}
    ></script>
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${meta.googleAnalyticsId}');
        `,
      }}
    />
  </Head>
);
