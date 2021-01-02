import React, { Fragment } from "react";
import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { postHandler } from "../libs/postHandler";
import { PostDetail, Props as PostDetailProps } from "../components/PostDetail";
import { Props as PostOverviewProps } from "../components/PostOverview";
import { CustomHead } from "../components/CustomHead";
import { PostOveviewsWithTitle } from "../components/PostOveviewsWithTitle";
import { Align } from "../components/Align";

type PageQuery = {
  paths: string[];
};

export const getStaticPaths: GetStaticPaths<PageQuery> = async () => {
  const allPosts = await postHandler.getAllPosts();

  return {
    fallback: false,
    paths: allPosts.map((post) => ({
      params: {
        paths: post.frontMatter.path.split("/").filter((path) => path !== ""),
      },
    })),
  };
};

type PageProps = {
  postDetail: PostDetailProps;
  description: string;
  recentPostOverviews: PostOverviewProps[];
};

export const getStaticProps: GetStaticProps<PageProps, PageQuery> = async (
  context
) => {
  const path = context.params?.paths as string[];
  const allPosts = await postHandler.getAllPosts();
  const post = await postHandler.getPostFromPath(`/${path.join("/")}`);
  if (!post)
    throw new Error(
      "Failed to find the target post when executing getPostFromPath()"
    );

  return {
    props: {
      postDetail: postHandler.postsToPostDetail(post),
      description: post.current.frontMatter.description,
      recentPostOverviews: allPosts
        .slice(0, 3)
        .map((post) => postHandler.postToPostOverview(post)),
    },
  };
};

const Page: NextPage<PageProps> = (props) => {
  return (
    <Fragment>
      <CustomHead
        title={props.postDetail.title}
        description={props.description}
      />
      <PostDetail {...props.postDetail} />
      <Align mt={120}>
        <PostOveviewsWithTitle
          title="最近の投稿"
          postOverviews={props.recentPostOverviews}
        />
      </Align>
    </Fragment>
  );
};

export default Page;
