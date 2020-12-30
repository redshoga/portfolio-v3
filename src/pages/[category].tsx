import React, { Fragment } from "react";
import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import categories from "../../blog/config/categories.json";
import { postHandler } from "../libs/postHandler";
import {
  PostOverview,
  Props as PostOverviewProps,
} from "../components/PostOverview";
import { CustomHead } from "../components/CustomHead";

type PageQuery = {
  category: string;
};

export const getStaticPaths: GetStaticPaths<PageQuery> = async () => ({
  fallback: false,
  paths: categories.map((category) => ({
    params: { category: category.name },
  })),
});

type PageProps = {
  postOverviews: PostOverviewProps[];
  category: string;
};

export const getStaticProps: GetStaticProps<PageProps, PageQuery> = async (
  context
) => {
  const categoryName = context.params?.category as string;
  const posts = await postHandler.getPostsFromCategory(categoryName);
  return {
    props: {
      postOverviews: posts.map((post) => postHandler.postToPostOverview(post)),
      category: categoryName,
    },
  };
};

const Page: NextPage<PageProps> = (props) => {
  return (
    <Fragment>
      <CustomHead title={props.category} />
      {props.postOverviews.map((overview) => (
        <PostOverview key={overview.href} {...overview} />
      ))}
    </Fragment>
  );
};

export default Page;
