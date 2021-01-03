import type { GetStaticProps, NextPage } from "next";
import React, { Fragment } from "react";
import { postHandler } from "../libs/postHandler";
import {
  PostOverview,
  Props as PostOverviewProps,
} from "../components/PostOverview";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";
import { buildBreadcrumb } from "../libs/buildBreadcrumb";

type PageProps = {
  postOverviews: PostOverviewProps[];
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const posts = await postHandler.getAllPosts();

  return {
    props: {
      postOverviews: posts.map((post) => postHandler.postToPostOverview(post)),
    },
  };
};

export const Page: NextPage<PageProps> = (props) => (
  <Fragment>
    <BreadcrumbJsonLd itemListElements={buildBreadcrumb({})} />
    {props.postOverviews.map((overview) => (
      <PostOverview key={overview.href} {...overview} />
    ))}
  </Fragment>
);

export default Page;
