import fs from "fs";
import path from "path";
import matter from "gray-matter";
import glob from "glob";
import util from "util";
import url from "url";
import type { Props as PostOverviewProps } from "../components/PostOverview";
import type { Props as PostDetailProps } from "../components/PostDetail";
import { createdAtFormat } from "./createdAtFormat";
import meta from "../../blog/config/meta.json";

const promisedGlob = util.promisify(glob);

export type FrontMatter = {
  title: string;
  createdAt: string;
  category: string;
  path: string;
};

export type Post = {
  markdownBody: string;
  frontMatter: FrontMatter;
};

let cachePosts: Post[] | undefined = undefined;

const readPostFromFile = async (filePath: string): Promise<Post> => {
  const mdWithFrontMatter = await fs.readFileSync(filePath).toString();
  const matterResult = matter(mdWithFrontMatter);
  return {
    markdownBody: matterResult.content,
    frontMatter: matterResult.data as FrontMatter,
  };
};

const readAllPostsFromFiles = async (
  targetPathPattern: string
): Promise<Post[]> => {
  const targetPathArray = await promisedGlob(targetPathPattern);
  return await Promise.all(
    targetPathArray.map((path) => readPostFromFile(path))
  );
};

const getAllPosts = async (): Promise<Post[]> => {
  if (cachePosts) return cachePosts;
  const posts = await readAllPostsFromFiles(
    path.join(process.cwd(), "/blog/posts/*.md")
  );
  cachePosts = posts.sort((a, b) =>
    new Date(a.frontMatter.createdAt) > new Date(b.frontMatter.createdAt)
      ? -1
      : 1
  );
  return cachePosts;
};

const getPostFromPath = async (
  path: string
): Promise<
  | {
      next?: Post;
      current: Post;
      prev?: Post;
    }
  | undefined
> => {
  const posts = await getAllPosts();
  const currentPostIndex = posts.findIndex(
    (post) => post.frontMatter.path === path
  );
  if (currentPostIndex === -1) return undefined;
  return {
    next: posts[currentPostIndex - 1],
    current: posts[currentPostIndex],
    prev: posts[currentPostIndex + 1],
  };
};

const getPostsFromCategory = async (categoryName: string): Promise<Post[]> => {
  const posts = await getAllPosts();
  return posts.filter((post) => post.frontMatter.category === categoryName);
};

const postToPostOverview = (post: Post): PostOverviewProps => ({
  title: post.frontMatter.title,
  href: post.frontMatter.path,
  createdAt: createdAtFormat(new Date(post.frontMatter.createdAt)),
  beginning: `${post.markdownBody.slice(0, 140)}...`,
});

const postsToPostDetail = (posts: {
  next?: Post;
  current: Post;
  prev?: Post;
}): PostDetailProps => ({
  title: posts.current.frontMatter.title,
  createdAt: createdAtFormat(new Date(posts.current.frontMatter.createdAt)),
  markdown: posts.current.markdownBody,
  currentUrl: url.resolve(meta.baseUrl, posts.current.frontMatter.path),
  prevPost: posts.prev
    ? {
        href: posts.prev?.frontMatter.path,
        title: posts.prev.frontMatter.title,
      }
    : null,
  nextPost: posts.next
    ? {
        href: posts.next?.frontMatter.path,
        title: posts.next.frontMatter.title,
      }
    : null,
});

export const postHandler = {
  getPostFromPath,
  getPostsFromCategory,
  getAllPosts,
  postToPostOverview,
  postsToPostDetail,
};
