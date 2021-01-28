import React, { Fragment, useState } from "react";
import Head from "next/head";

export type Props = {
  currentUrl: string;
};

const classNames = {
  container: "container",
  button: "button",
};

const ShareOnTwitter = () => (
  <Fragment>
    <a
      href="https://twitter.com/share?ref_src=twsrc%5Etfw"
      className="twitter-share-button"
      data-show-count="false"
    >
      Tweet
    </a>
    <Head>
      <script
        defer
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></script>
    </Head>
  </Fragment>
);

const ShareOnHatena = () => (
  <Fragment>
    <a
      href="https://b.hatena.ne.jp/entry/"
      className="hatena-bookmark-button"
      data-hatena-bookmark-layout="basic-label"
      data-hatena-bookmark-lang="ja"
      data-hatena-bookmark-height="20"
      title="このエントリーをはてなブックマークに追加"
    >
      <img
        src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png"
        alt="このエントリーをはてなブックマークに追加"
        width="20"
        height="20"
        style={{ border: "none" }}
      />
    </a>
    <Head>
      <script
        type="text/javascript"
        src="https://b.st-hatena.com/js/bookmark_button.js"
        charSet="utf-8"
        async
        defer
      ></script>
    </Head>
  </Fragment>
);

export const ShareButtons: React.FC<Props> = (props) => (
  <Fragment>
    <div className={classNames.container}>
      <div className={classNames.button}>
        <ShareOnTwitter />
      </div>
      <div className={classNames.button}>
        <ShareOnHatena />
      </div>
    </div>
    <style jsx>{`
      .${classNames.container} {
        display: inline-flex;
      }
      .${classNames.button} + .${classNames.button} {
        margin-left: 8px;
      }
    `}</style>
  </Fragment>
);
