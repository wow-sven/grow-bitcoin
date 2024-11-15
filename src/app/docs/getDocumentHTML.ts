import fs from "fs";
import path from "path";
import { unified } from "unified";
import markdown from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { toc } from "mdast-util-toc";
import { toHast } from "mdast-util-to-hast";
import { toHtml } from "hast-util-to-html";

export default async function getDocumentHTML() {
  const fileContents = fs.readFileSync(
    path.join(process.cwd(), "src/app/docs/document.md"),
    "utf8",
  );

  const processedContent = await unified()
    .use(markdown)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(fileContents);
  const contentHTML = processedContent.toString();

  const mdast = unified().use(markdown).parse(fileContents);
  const tocTree = toc(mdast, {
    maxDepth: 3,
  });
  const tocHast = toHast(tocTree.map!);
  const tocHTML = toHtml(tocHast);

  return { contentHTML, tocHTML };
}
