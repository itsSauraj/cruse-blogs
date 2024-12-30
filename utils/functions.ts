import slugify from "slugify";
import { unified } from "unified";
import remarkParse from "remark-parse";

export const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(
      () => {
        return null;
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (err) => {
        return null;
      },
    );
  } else {
    return null;
  }
};

export const generateSlug = (text: string) => {
  return slugify(
    String(text)
      .replace(/[^a-zA-Z ]/g, "")
      .toLowerCase(),
  );
};

export const extractHeadings = (markdown: string): Heading[] => {
  const tree = unified().use(remarkParse).parse(markdown);
  const rootHeadings: Heading[] = [];
  const stack: Heading[] = [];

  const walk = (node: any) => {
    if (node.type === "heading") {
      const text = node.children
        .filter((child: any) => child.type === "text")
        .map((child: any) => child.value)
        .join("");

      const heading: Heading = { level: node.depth, text, children: [] };

      while (
        stack.length > 0 &&
        stack[stack.length - 1].level >= heading.level
      ) {
        stack.pop();
      }

      if (stack.length === 0) {
        rootHeadings.push(heading);
      } else {
        stack[stack.length - 1].children.push(heading);
      }

      stack.push(heading);
    }

    if (node.children) {
      node.children.forEach((child: any) => walk(child));
    }
  };

  walk(tree);

  return rootHeadings;
};

export function logoutUserHandeler() {
  fetch("/api/v1/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    window.location.href = "/";
  });
}
