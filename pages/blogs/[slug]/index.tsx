import { useRouter } from "next/router";
import { User } from "@nextui-org/user";
import { Divider } from "@nextui-org/divider";
import Link from "next/link";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import Head from "next/head";

import styledComponents from "@/components/blogs/customStyles";
import HeadingTree from "@/components/blogs/headingTree";
import DefaultLayout from "@/layouts/default";
import { getBlogsList } from "@/pages/api/blogs";
import { extractHeadings } from "@/utils/functions";

export async function getStaticPaths() {
  const blogs = await getBlogsList();

  const paths = blogs.map((blog: CruseTypes.BlogTypes) => ({
    params: { slug: blog.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps() {
  const blogs = await getBlogsList();

  return {
    props: {
      blogs,
    },
  };
}

const BlogPage = ({ blogs }: { blogs: CruseTypes.BlogTypes[] }) => {
  const router = useRouter();
  const blog_slug = router.query.slug;

  const blog = blogs.find(
    (blog: CruseTypes.BlogTypes) => blog.slug === blog_slug,
  );

  if (!blog) {
    return null;
  }

  const headings = extractHeadings(blog?.content);

  return (
    <DefaultLayout>
      <Head>
        <title>{blog?.title}</title>
        <meta content={blog?.summary} name="description" />
      </Head>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold uppercase">
          {blog?.title}
        </h1>
        <User
          avatarProps={{
            src: "https://i.pravatar.cc/300",
          }}
          className="w-full justify-start"
          description={blog?.date}
          name={
            <Link href={`mailto:${blog?.author_email}`} target="_blank">
              {blog?.author}
            </Link>
          }
        />
        <Divider />
        <div className="flex gap-4 relative">
          <section className="flex flex-grow flex-col gap-[12px] bg-gray-100 p-10 rounded-lg dark:bg-gray-800">
            <Markdown
              components={styledComponents}
              rehypePlugins={[remarkParse, rehypeRaw, remarkRehype]}
              remarkPlugins={[remarkGfm]}
              remarkRehypeOptions={{ passThrough: ["link"] }}
            >
              {blog?.content}
            </Markdown>
          </section>
          <div className="hidden lg:block sticky top-0 right-0 h-[100svh] overflow-y-scroll overflow-x-hidden gap-[12px] bg-gray-100 p-10 rounded-lg dark:bg-gray-800 w-[400px]">
            <h3 className="text-xl font-bold">Table of contents</h3>
            <HeadingTree headings={headings} />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default BlogPage;
