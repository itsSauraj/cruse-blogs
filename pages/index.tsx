import { Button } from "@nextui-org/button";
import { Code } from "@nextui-org/code";
import Link from "next/link";
import { Snippet } from "@nextui-org/snippet";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <img
          alt="sauraj"
          className="w-[250px] h-[250px] rounded-full"
          loading="lazy"
          src={`https://www.creativefabrica.com/wp-content/uploads/2022/11/21/Black-Boy-Retro-Charming-Avatar-47769583-1.png`}
        />
        <h3 className={`${title({ color: "blue" })} font-bolder`}>
          Hi, I am Sauraj
        </h3>
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            I write blogs on{" "}
            <Code color="primary">fullstack web application development</Code>
          </span>
        </Snippet>
        <Button
          as={Link}
          color="primary"
          href="/blogs"
          size="lg"
          variant="ghost"
        >
          Read my blogs
        </Button>
      </div>
    </DefaultLayout>
  );
}
