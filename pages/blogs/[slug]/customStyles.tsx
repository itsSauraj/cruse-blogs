// @ts-ignore
import { useState, useRef, useEffect } from "react";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark as IDEDark,
  oneLight as IDELight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { IoMdCopy } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

import { copyToClipboard, generateSlug } from "@/utils/functions";

const styledComponents = {
  h1(props: any) {
    const { node, ...rest } = props;
    const slug = generateSlug(props.children);

    return (
      <div className="flex gap-2 items-center relative p-2 border-b-1 group">
        <a
          className="absolute left-[-25px] opacity-0 group-hover:opacity-100"
          href={`#${slug}`}
        >
          <FaLink size={20} />
        </a>
        <h1 className="text-3xl font-bold" {...rest} id={slug}>
          {props.children}
        </h1>
      </div>
    );
  },
  h2(props: any) {
    const { node, ...rest } = props;
    const slug = generateSlug(props.children);

    return (
      <div className="flex gap-2 items-center relative p-2 border-b-1 group">
        <a
          className="absolute left-[-25px] opacity-0 group-hover:opacity-100"
          href={`#${slug}`}
        >
          <FaLink size={20} />
        </a>
        <h2 className="text-2xl font-bold" {...rest} id={slug}>
          {props.children}
        </h2>
      </div>
    );
  },
  h3(props: any) {
    const { node, ...rest } = props;
    const slug = generateSlug(props.children);

    return (
      <div className="flex gap-2 items-center relative group">
        <a
          className="absolute left-[-25px] opacity-0 group-hover:opacity-100"
          href={`#${slug}`}
        >
          <FaLink size={20} />
        </a>
        <h3 className="text-xl font-bold" {...rest} id={slug}>
          {props.children}
        </h3>
      </div>
    );
  },
  h4(props: any) {
    const { node, ...rest } = props;
    const slug = generateSlug(props.children);

    return (
      <div className="flex gap-2 items-center relative group">
        <a
          className="absolute left-[-25px] opacity-0 group-hover:opacity-100"
          href={`#${slug}`}
        >
          <FaLink size={20} />
        </a>
        <h4 className="text-xl font-bold" {...rest} id={slug}>
          {props.children}
        </h4>
      </div>
    );
  },
  h5(props: any) {
    const { node, ...rest } = props;
    const slug = generateSlug(props.children);

    return (
      <div className="flex gap-2 items-center relative group">
        <a
          className="absolute left-[-25px] opacity-0 group-hover:opacity-100"
          href={`#${slug}`}
        >
          <FaLink size={20} />
        </a>
        <h5 className="text-xl font-bold" {...rest} id={slug}>
          {props.children}
        </h5>
      </div>
    );
  },
  h6(props: any) {
    const { node, ...rest } = props;
    const slug = generateSlug(props.children);

    return (
      <div className="flex gap-2 items-center relative group">
        <a
          className="absolute left-[-25px] opacity-0 group-hover:opacity-100"
          href={`#${slug}`}
        >
          <FaLink size={20} />
        </a>
        <h6 className="text-xl font-bold" {...rest} id={slug}>
          {props.children}
        </h6>
      </div>
    );
  },
  p(props: any) {
    const { node, ...rest } = props;

    if (node.children[0].type === "element") {
      const { tagName } = node.children[0];

      if (tagName === "img") {
        return (
          <div className="flex md:flex-row gap-2 flex-wrap p-3">
            {(() => {
              try {
                return props.children.map((child: any, index: number) => {
                  if (!child.props) return null;

                  return (
                    <Image
                      key={index}
                      alt="no-image"
                      className="max-w-[300px] md:flex-grow aspect-video"
                      {...child.props}
                    />
                  );
                });
              } catch (error) {
                return (
                  <Image
                    alt="no-image"
                    className="w-max md:flex-grow aspect-video"
                    {...props.children.props}
                  />
                );
              }
            })()}
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

    if (node.children[0].tagName === "code") {
      return (
        <a
          className="text-blue-500 hover:underline ts"
          rel="noopener noreferrer"
          target="_blank"
          {...rest}
        >
          <code
            className={
              "bg-[#dfdede] text-[#6598e6] dark:bg-[#3b3b3b] px-1 py-[0.5px] rounded-md"
            }
            {...rest}
          >
            {props.children.props.children}
          </code>
        </a>
      );
    }

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

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const codeReference = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [copied, setCopied] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [edit, setEdit] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [codeTheme, setCodeTheme] = useState<"dark" | "light">("dark");
    const [initialButtonClasses, setInitialClasses] =
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useState(`bg-white text-gray-700 p-1 rounded text-[10px] 
      ${codeTheme === "light" ? "bg-gray-800" : ""}`);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (codeTheme === "dark") {
        setInitialClasses(`bg-white text-gray-700 p-1 rounded text-[10px]`);
      } else {
        setInitialClasses(`bg-gray-800 text-white p-1 rounded text-[10px]`);
      }
    }, [codeTheme]);

    function copyToClipboardHandler() {
      const wrapper = codeReference.current;
      const codeContainer = wrapper?.querySelector("code");

      copyToClipboard(codeContainer?.textContent || "");
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }

    function editHandler() {
      setEdit((prev) => !prev);
    }

    function codeThemeHandler() {
      setCodeTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }

    return !inline && match ? (
      <div ref={codeReference} className="relative">
        <div className="flex absolute top-2 right-2 gap-2">
          <button
            className={initialButtonClasses}
            onClick={copyToClipboardHandler}
          >
            {copied ? "Copied" : <IoMdCopy size={18} />}
          </button>
          <button
            className={`${initialButtonClasses} ${edit ? "bg-yellow-300" : ""} 
            `}
            onClick={editHandler}
          >
            <FaEdit
              className={
                codeTheme === "light"
                  ? edit
                    ? "text-black"
                    : "text-white"
                  : "text-black"
              }
              size={16}
            />
          </button>
          <button className={initialButtonClasses} onClick={codeThemeHandler}>
            {codeTheme === "dark" ? (
              <CiLight size={18} />
            ) : (
              <MdOutlineDarkMode size={18} />
            )}
          </button>
        </div>
        <SyntaxHighlighter
          PreTag="div"
          className="rounded-md p-5 dark:bg-gray-800"
          language={match[1]}
          style={codeTheme === "dark" ? IDEDark : IDELight}
          {...rest}
          contentEditable={edit}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code
        className={
          "bg-[#dfdede] text-[#3b3b3b] dark:text-[#dfdede] dark:bg-[#3b3b3b] px-1 py-[0.5px] rounded-md"
        }
        {...rest}
      >
        {children}
      </code>
    );
  },
  table(props: any) {
    const { node, ...rest } = props;

    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          {...rest}
        >
          {props.children && props.children[0]?.type === "thead" && (
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {props.children[0].props.children.props.children.map(
                  (child: any, index: number) => (
                    <th key={index} className="px-6 py-3" scope="col">
                      {child.props.children}
                    </th>
                  ),
                )}
              </tr>
            </thead>
          )}
          {props.children && props.children[1]?.type === "tbody" && (
            <tbody>
              {props.children[1].props.children.map(
                (child: any, index: number) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    {child.props.children.map((td: any, index: number) => (
                      <td key={index} className="px-6 py-3">
                        {td.props.children}
                      </td>
                    ))}
                  </tr>
                ),
              )}
            </tbody>
          )}
        </table>
      </div>
    );
  },
};

export default styledComponents;
