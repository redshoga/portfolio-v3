import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import categories from "../../blog/config/categories.json";
import meta from "../../blog/config/meta.json";
import { colors } from "../styles/colors";
import { textStyle } from "../styles/textStyle";

export type Props = {
  nextRouterAsPath: string;
};

const classNames = {
  iconContainer: "icon-container",
  linkActive: "link-active",
};

const getCategoryName = (nextRouterAsPath: string): string =>
  nextRouterAsPath.split("?")[0].split("/")[1];

export const Heading: React.FC<Props> = (props: Props) => (
  <Fragment>
    <header>
      <div className={classNames.iconContainer}>
        <Image src="/icon.jpg" alt={meta.author} width={64} height={64} />
      </div>

      <Link href="/">
        <a>
          <h1>{meta.title}</h1>
        </a>
      </Link>

      <nav>
        <ul>
          {categories.map((category) => (
            <li key={category.name}>
              <Link href={`/${category.name}`}>
                <a
                  className={
                    getCategoryName(props.nextRouterAsPath) === category.name
                      ? classNames.linkActive
                      : undefined
                  }
                >
                  {category.display}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
    <style jsx>
      {`
        header {
          text-align: center;
        }
        .${classNames.iconContainer} {
          display: inline-block;
          overflow: hidden;
          border-radius: 32px;
          width: 64px;
          height: 64px;
        }

        h1 {
          ${textStyle({ weight: "bold", size: "xl" })}
          margin: 16px 0;
        }

        ul {
          padding-inline-start: 0;
        }

        li {
          display: inline-block;
        }
        li + li {
          margin-left: 16px;
        }

        a {
          text-decoration: none;
          color: ${colors.black};
        }
        a:hover {
          text-decoration: underline;
        }
        a.${classNames.linkActive} {
          ${textStyle({ weight: "bold", size: "m" })}
        }
      `}
    </style>
  </Fragment>
);
