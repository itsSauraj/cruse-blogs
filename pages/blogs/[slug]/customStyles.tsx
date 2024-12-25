// @ts-ignore
import { useState } from "react";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import CopyIcon from "@/assets/copy-icon.svg";

export const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Text copied to clipboard");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      },
    );
  } else {
    console.warn("Clipboard API not available");
  }
};

const styledComponents = {
  h1(props: any) {
    const { node, ...rest } = props;

    return (
      <h1 className="text-3xl font-bold" {...rest}>
        {props.children}
      </h1>
    );
  },
  h2(props: any) {
    const { node, ...rest } = props;

    return (
      <h2 className="text-2xl font-bold" {...rest}>
        {props.children}
      </h2>
    );
  },
  h3(props: any) {
    const { node, ...rest } = props;

    return (
      <h3 className="text-xl font-bold" {...rest}>
        {props.children}
      </h3>
    );
  },
  h4(props: any) {
    const { node, ...rest } = props;

    return (
      <h4 className="text-lg font-bold" {...rest}>
        {props.children}
      </h4>
    );
  },
  h5(props: any) {
    const { node, ...rest } = props;

    return (
      <h5 className="text-base font-bold" {...rest}>
        {props.children}
      </h5>
    );
  },
  h6(props: any) {
    const { node, ...rest } = props;

    return (
      <h6 className="text-sm font-bold" {...rest}>
        {props.children}
      </h6>
    );
  },
  p(props: any) {
    const { node, ...rest } = props;

    if (node.children[0].type === "element") {
      const { tagName } = node.children[0];

      if (tagName === "img") {
        return (
          <div className="flex flex-col md:flex-row justify-center gap-5">
            {props.children.map((child: any, index: number) => {
              if (!child.props) return null;

              return (
                <Image
                  key={index}
                  alt="no-image"
                  className="w-[300px] md:flex-grow aspect-video"
                  {...child.props}
                />
              );
            })}
          </div>
        );
      }
    }

    return (
      <p className="text-base" {...rest}>
        {props.children}
      </p>
    );
  },
  a(props: any) {
    const { node, ...rest } = props;

    return (
      <a
        className="text-blue-500 hover:underline ts"
        rel="noopener noreferrer"
        target="_blank"
        {...rest}
      >
        {props.children}
      </a>
    );
  },
  li(props: any) {
    const { node, ...rest } = props;

    if (node.children[0].type === "element") {
      const { tagName } = node.children[0];

      if (tagName === "a") {
        return (
          <li className="list-disc list-inside" {...rest}>
            <Link
              className="text-blue-500 hover:underline ts"
              href={props.children.props.href}
            >
              {props.children.props.children}
            </Link>
          </li>
        );
      }
    }

    return (
      <li className="list-disc list-inside" {...rest}>
        {props.children}
      </li>
    );
  },
  code(props: any) {
    const { node, inline, className, children, ...rest } = props;
    const match = /language-(\w+)/.exec(className || "");
    const [copied, setCopied] = useState(false);
    const [edit, setEdit] = useState(false);

    function copyToClipboardHandler(text: string) {
      copyToClipboard(String(children).replace(/\n$/, ""));
      setCopied(true);
    }

    function editHandler() {
      setEdit((prev) => !prev);
    }

    return !inline && match ? (
      <div className="relative">
        <button
          className={`absolute top-2 right-2 bg-white text-gray-700 p-1 rounded text-[10px]
            ${edit ? "bg-blue-400 text-black" : ""} 
          `}
          onClick={editHandler}
        >
          Edit
        </button>
        <button
          className="absolute top-2 right-10 bg-white text-gray-700 p-1 rounded text-[10px]"
          onClick={copyToClipboardHandler}
        >
          {copied ? (
            "Copied"
          ) : (
            <img alt="copy-icon" className="w-4 h-4 " src={CopyIcon.src} />
          )}
        </button>
        <SyntaxHighlighter
          PreTag="div"
          className="rounded-md p-5 dark:bg-gray-800"
          language={match[1]}
          style={atomDark}
          {...rest}
          contentEditable={edit}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className={className} {...rest}>
        {children}
      </code>
    );
  },
};

export default styledComponents;
