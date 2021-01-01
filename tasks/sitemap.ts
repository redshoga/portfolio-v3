import * as fs from "fs";
import * as path from "path";
import * as url from "url";
import { postHandler } from "./../src/libs/postHandler";
import categories from "./../blog/config/categories.json";

const OUTPUT_FILE = "../public/sitemap.xml";
const BASE_URL = "https://ichioka.tokyaao";

type Link = {
  location: string;
  lastModified: Date;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
};

const sitemapMarkupFromLinks = (links: Link[]): string => {
  const dateToString = (d: Date) =>
    `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

  const urlMarkupFromLink = (link: Link) => `
    <url>
      <loc>${link.location}</loc>
      <lastmod>${dateToString(link.lastModified)}</lastmod>
      <changefreq>${link.changeFrequency}</changefreq>
    </url>
  `;

  const sitemapMarkup = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${links.map((link) => urlMarkupFromLink(link)).join("")}
    </urlset>
  `;

  return sitemapMarkup.replace(/[ \n]+?/g, "");
};

(async () => {
  const posts = await postHandler.getAllPosts();

  const topPage: Link = {
    location: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "daily",
  };

  const postPageLinks: Link[] = posts.map((post) => ({
    location: url.resolve(BASE_URL, post.frontMatter.path),
    lastModified: new Date(post.frontMatter.createdAt),
    changeFrequency: "monthly",
  }));

  const categoryPageLinks: Link[] = categories.map((category) => ({
    location: url.resolve(BASE_URL, category.name),
    lastModified: new Date(
      posts
        .filter((post) => post.frontMatter.category === category.name)
        .sort(
          (a, b) =>
            new Date(a.frontMatter.createdAt).getTime() -
            new Date(a.frontMatter.createdAt).getTime()
        )[0].frontMatter.createdAt
    ),
    changeFrequency: "weekly",
  }));

  fs.writeFileSync(
    path.resolve(__dirname, OUTPUT_FILE),
    sitemapMarkupFromLinks([topPage, ...categoryPageLinks, ...postPageLinks]),
    {
      encoding: "utf-8",
    }
  );
})();
