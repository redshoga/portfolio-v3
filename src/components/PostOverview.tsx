import Link from "next/link";
import React, { Fragment } from "react";
import { colors } from "../styles/colors";
import { textStyle } from "../styles/textStyle";

export type Props = {
  title: string;
  href: string;
  createdAt: string;
  beginning: string;
};

const classNames = {
  link: "link",
  container: "container",
  title: "title",
  createdAt: "created-at",
  beginning: "beginning",
};

export const PostOverview: React.FC<Props> = (props: Props) => (
  <Fragment>
    <section>
      <Link href={props.href}>
        <a className={classNames.link}>
          <div className={classNames.container}>
            <div>
              <h1 className={classNames.title}>{props.title}</h1>
              <div className={classNames.createdAt}>
                {props.createdAt}に投稿
              </div>
              <div className={classNames.beginning}>{props.beginning}</div>
            </div>
          </div>
        </a>
      </Link>
    </section>

    <style jsx>{`
      section + section {
        margin-top: 24px;
      }
      .${classNames.container} {
        position: relative;
        border-radius: 8px;
        height: 240px;
        padding: 0 40px;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: 0.1s;
        transition-timing-function: ease-out;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0);
      }
      .${classNames.container}:hover {
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
      }

      .${classNames.container}::after {
        position: absolute;
        right: 40px;
        content: "";
        width: 8px;
        height: 8px;
        border-top: 1px solid ${colors.black};
        border-right: 1px solid ${colors.black};
        transform: rotate(45deg);
      }

      .${classNames.link} {
        color: ${colors.black};
        text-decoration: none;
      }

      .${classNames.title} {
        ${textStyle({ size: "l", weight: "bold" })}
        margin-bottom: 16px;
      }

      .${classNames.title} {
        ${textStyle({ size: "l", weight: "bold" })}
        margin-bottom: 16px;
      }
      .${classNames.createdAt} {
        margin-bottom: 24px;
      }
      .${classNames.beginning} {
        width: 100%;
      }
    `}</style>
  </Fragment>
);
