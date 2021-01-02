import React, { Fragment } from "react";
import { textStyle } from "../styles/textStyle";
import { PostOverview, Props as PostOverviewProps } from "./PostOverview";

export type Props = {
  title: string;
  postOverviews: PostOverviewProps[];
};

export const PostOveviewsWithTitle: React.FC<Props> = (props: Props) => (
  <Fragment>
    <h1>{props.title}</h1>
    {props.postOverviews.map((overview) => (
      <PostOverview key={overview.href} {...overview} />
    ))}
    <style jsx>{`
      h1 {
        ${textStyle({ weight: "bold", size: "l" })}
        margin: 0;
        margin-bottom: 40px;
      }
    `}</style>
  </Fragment>
);
