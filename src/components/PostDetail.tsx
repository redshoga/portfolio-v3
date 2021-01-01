import Link from "next/link";
import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import { textStyle } from "../styles/textStyle";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import vscDarkPlus from "react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus";

export type Props = {
  title: string;
  createdAt: string;
  markdown: string;
  prevPost: {
    href: string;
    title: string;
  } | null;
  nextPost: {
    href: string;
    title: string;
  } | null;
};

const classNames = {
  title: "title",
  createdAt: "created-at",
  mdContainer: "md-container",
  prevNextContainer: "prev-next-container",
  prev: "prev",
  next: "next",
};

const CodeBlock: React.FC<{
  value: string;
  language?: string;
}> = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={vscDarkPlus}>
      {value}
    </SyntaxHighlighter>
  );
};

export const PostDetail: React.FC<Props> = (props: Props) => (
  <Fragment>
    <article>
      <h1 className={classNames.title}>{props.title}</h1>
      <div className={classNames.createdAt}>{props.createdAt}に投稿</div>
      <div className={classNames.mdContainer}>
        <ReactMarkdown
          source={props.markdown}
          renderers={{
            link: ({ children, href }) => (
              <Link href={href}>
                <a>{children}</a>
              </Link>
            ),
            code: CodeBlock,
          }}
        />
      </div>
    </article>
    <div className={classNames.prevNextContainer}>
      <div className={classNames.next}>
        {props.nextPost && (
          <Fragment>
            <div>次の投稿</div>
            <Link href={props.nextPost.href}>{props.nextPost.title}</Link>
          </Fragment>
        )}
      </div>
      <div className={classNames.prev}>
        {props.prevPost && (
          <Fragment>
            <div>前の投稿</div>
            <Link href={props.prevPost.href}>{props.prevPost.title}</Link>
          </Fragment>
        )}
      </div>
    </div>
    <style jsx global>{`
      .${classNames.mdContainer} h1 {
        font-size: 24px;
      }
      .${classNames.mdContainer} h2 {
        font-size: 21px;
      }
      .${classNames.mdContainer} h3 {
        font-size: 18px;
      }
      .${classNames.mdContainer} h4 {
        font-size: 16px;
      }
      .${classNames.mdContainer} h5 {
        font-size: 15px;
      }
      .${classNames.mdContainer} h6 {
        font-size: 14px;
      }
      .${classNames.mdContainer} code {
        white-space: pre-line;
      }
    `}</style>
    <style jsx>{`
      .${classNames.title} {
        ${textStyle({ weight: "bold", size: "l" })}
        margin: 0;
      }
      .${classNames.title}, .${classNames.createdAt}, article {
        margin-bottom: 40px;
      }

      .${classNames.prevNextContainer} {
        display: flex;
        justify-content: space-between;
      }
      .${classNames.prev} {
        text-align: right;
      }
    `}</style>
  </Fragment>
);
