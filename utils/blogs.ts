import path from "path";
import fs from "fs";

import matter from "gray-matter";

//TODO: fetch from database
export const getFiles = (): string[] => {
  const directoryPath = path.join(process.cwd(), "blog");
  const files = fs.readdirSync(directoryPath);

  return files;
};

//TODO: fetch from database
export const getBlogsList = (): CruseTypes.BlogTypes[] => {
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
