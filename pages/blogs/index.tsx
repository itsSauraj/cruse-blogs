import Head from "next/head";

import DefaultLayout from "@/layouts/default";
import BlogListCard from "@/components/blogs/card";
import { getBlogsList } from "@/utils/blogs";
import JoinAlert from "@/components/alert";

export async function getStaticProps() {
  const blogs = await getBlogsList();

  return {
    props: {
      blogs,
    },
  };
}

export default function BlogsPage({ blogs }: any) {
  return (
    <DefaultLayout>
      <Head>
        <title>Cruse Blogs</title>
        <meta
          content="Read blogs that form all over the world"
          name="description"
        />
      </Head>
      <JoinAlert />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {
          // @ts-ignore
          blogs.map((blog) => (
            <BlogListCard key={blog.id} blog={blog} />
          ))
        }
      </section>
    </DefaultLayout>
  );
}
