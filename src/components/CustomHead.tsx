import React from "react";
import Head from "next/head";
import meta from "../../blog/config/meta.json";

export type Props = {
  title?: string;
};

export const CustomHead: React.FC<Props> = (props: Props) => (
  <Head>
    <title>{props.title ? `${props.title} | ${meta.title}` : meta.title}</title>
    <link
      href="/images/apple-touch-icon.png"
      rel="apple-touch-icon"
      sizes="152x152"
    />
    <link href="/icon.jpg" rel="icon" sizes="32x32" type="image/jpg" />
  </Head>
);
