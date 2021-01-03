import React from "react";
import Head from "next/head";

export type BreadcrumbListItem = {
  item: string;
  name: string;
  position: number;
};

export type Props = {
  keyOverride?: string;
  itemListElements: BreadcrumbListItem[];
};

// https://github.com/garmeeh/next-seo/blob/master/src/jsonld/breadcrumb.tsx
const BreadCrumbJsonLd: React.FC<Props> = ({
  keyOverride,
  itemListElements = [],
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      ${itemListElements.map(
        (itemListElement) => `{
        "@type": "ListItem",
        "position": ${itemListElement.position},
        "item": {
          "@id": "${itemListElement.item}",
          "name": "${itemListElement.name}"
        }
      }`
      )}
    ]
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jslonld,
        }}
        key={`jsonld-breadcrumb${keyOverride ? `-${keyOverride}` : ""}`}
      />
    </Head>
  );
};

export default BreadCrumbJsonLd;
