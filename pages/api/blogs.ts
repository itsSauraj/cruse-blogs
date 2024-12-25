import path from "path";
import fs from "fs";

import matter from "gray-matter";

export const getFiles = () => {
  const directoryPath = path.join(process.cwd(), "blog");
  const files = fs.readdirSync(directoryPath);

  return files;
};

export const getBlogsList = (): any => {
  const files = getFiles();
  const blogs: any = files.map((file) => {
    const filePath = path.join(process.cwd(), "blog", file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      ...data,
      content: content,
    };
  });

  return blogs;
}
