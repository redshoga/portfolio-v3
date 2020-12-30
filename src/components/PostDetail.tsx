import Link from "next/link";
import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import { textStyle } from "../styles/textStyle";

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
  prevNextContainer: "prev-next-container",
  prev: "prev",
  next: "next",
};

export const PostDetail: React.FC<Props> = (props: Props) => (
  <Fragment>
    <article>
      <h2 className={classNames.title}>{props.title}</h2>
      <div className={classNames.createdAt}>{props.createdAt}に投稿</div>
      <ReactMarkdown
        source={props.markdown}
        renderers={{
          link: ({ children, href }) => {
            return (
              <Link href={href}>
                <a>{children}</a>
              </Link>
            );
          },
        }}
      />
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
    <style jsx>{`
      .${classNames.title} {
        ${textStyle({ weight: "bold", size: "l" })}
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
