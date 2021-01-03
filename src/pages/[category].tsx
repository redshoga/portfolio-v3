import React, { Fragment } from "react";
import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import categories from "../../blog/config/categories.json";
import { postHandler } from "../libs/postHandler";
import {
  PostOverview,
  Props as PostOverviewProps,
} from "../components/PostOverview";
import { CustomHead } from "../components/CustomHead";
import { buildBreadcrumb } from "../libs/buildBreadcrumb";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";

type PageQuery = {
  category: string;
};

export const getStaticPaths: GetStaticPaths<PageQuery> = async (context) => ({
  fallback: false,
  paths: categories.map((category) => ({
    params: {
      category: category.name,
    },
  })),
});

type PageProps = {
  postOverviews: PostOverviewProps[];
  categoryName: string;
  categoryDisplay: string;
  categoryPath: string;
};

export const getStaticProps: GetStaticProps<PageProps, PageQuery> = async (
  context
) => {
  const categoryName = context.params?.category as string;
  const category = categories.find(
    (category) => category.name === categoryName
  );

  if (!category) throw new Error("Failed to find category");

  const posts = await postHandler.getPostsFromCategory(categoryName);
  return {
    props: {
      postOverviews: posts.map((post) => postHandler.postToPostOverview(post)),
      categoryName: category.name,
      categoryDisplay: category.display,
      categoryPath: category.path,
    },
  };
};

const Page: NextPage<PageProps> = (props) => {
  return (
    <Fragment>
      <CustomHead
        title={props.categoryDisplay}
        description={`${props.categoryDisplay}に関する投稿一覧ページ`}
      />
      <BreadcrumbJsonLd
        itemListElements={buildBreadcrumb({
          category: {
            name: props.categoryDisplay,
            path: props.categoryPath,
          },
        })}
      />
      {props.postOverviews.map((overview) => (
        <PostOverview key={overview.href} {...overview} />
      ))}
    </Fragment>
  );
};

export default Page;
