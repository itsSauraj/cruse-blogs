import { useRouter } from "next/router";
import { User } from "@nextui-org/user";
import { Divider } from "@nextui-org/divider";
import Link from "next/link";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Head from "next/head";

import styledComponents from "./customStyles";

import DefaultLayout from "@/layouts/default";
import { getBlogsList } from "@/pages/api/blogs";

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

  return (
    <DefaultLayout>
      <Head>
        <title>{blog?.title}</title>
        <meta content={blog?.summary} name="description" />
      </Head>
      <div className="flex flex-col gap-5">
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
        <section className="flex flex-col gap-1 bg-gray-100 p-5 rounded-lg dark:bg-gray-800">
          <Markdown components={styledComponents} rehypePlugins={[rehypeRaw]}>
            {blog?.content}
          </Markdown>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default BlogPage;
