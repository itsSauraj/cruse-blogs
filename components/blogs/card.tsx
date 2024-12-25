import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

interface BlogsPageProps {
  blog: CruseTypes.BlogTypes;
}

export default function BlogListCard({ blog }: BlogsPageProps) {
  const blogPath = `/blogs/${blog.slug}`;

  return (
    <Card className="w-[900px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{blog.title}</p>
          <p className="text-small text-default-500">
            <a
              className="hover:underline"
              href={`mailto:${blog.author_email}`}
              rel="noreferrer"
              target="_blank"
            >
              {blog.author}
            </a>{" "}
            | {blog.date}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{blog.summary}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button as={Link} href={blogPath} variant="light">
          Read more
        </Button>
      </CardFooter>
    </Card>
  );
}
