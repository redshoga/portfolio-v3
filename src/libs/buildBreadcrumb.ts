import { BreadcrumbListItem } from "../components/BreadcrumbJsonLd";
import meta from "../../blog/config/meta.json";
import url from "url";

export const buildBreadcrumb = (opt: {
  category?: { name: string; path: string };
  post?: { name: string; url: string };
}): BreadcrumbListItem[] => {
  const root: BreadcrumbListItem = {
    item: meta.baseUrl,
    name: meta.title,
    position: 1,
  };

  if (opt.category && !opt.post) {
    return [
      root,
      {
        item: url.resolve(meta.baseUrl, opt.category.path),
        name: opt.category.name,
        position: 2,
      },
    ];
  }

  if (opt.category && opt.post) {
    return [
      root,
      {
        item: url.resolve(meta.baseUrl, opt.category.path),
        name: opt.category.name,
        position: 2,
      },
      {
        item: url.resolve(meta.baseUrl, opt.post.url),
        name: opt.post.name,
        position: 3,
      },
    ];
  }

  return [root];
};
