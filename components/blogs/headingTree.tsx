import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Tooltip } from "@nextui-org/react";

import { generateSlug } from "@/utils/functions";

const HeadingTree: React.FC<{ headings: BlogTypes.Heading[] }> = ({
  headings,
}) => {
  if (!headings || headings.length === 0) return null;

  console.log("headings", headings);

  const [collapsed, setCollapsed] = useState<{ [key: number]: boolean }>({});

  const toggleCollapse = (index: number) => {
    setCollapsed((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <ul className="w-full">
      {headings.map((heading, index) =>
        heading.text ? (
          <li
            key={index}
            className="border-3 border-l-gray-400 border-t-0 border-b-0 border-r-0 pl-3"
          >
            <a
              className={`${
                heading.level === 1 ? "font-bold" : "font-normal"
              } cursor-pointer bg-none border-none p-1 rounded-md text-left w-full text-ellipsis overflow-hidden text-wrap flex justify-between items-center dark:hover:bg-gray-600 `}
              href={`#${generateSlug(heading.text)}`}
            >
              <Tooltip
                className="text-md uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                content={heading.text}
                placement="top"
              >
                <p className="text-md uppercase whitespace-nowrap overflow-hidden text-ellipsis">
                  {heading.text}
                </p>
              </Tooltip>
              {heading.children && heading.children.length > 0 && (
                <button
                  className="w-[15px]"
                  onClick={() => toggleCollapse(index)}
                >
                  {collapsed[index] ? (
                    <FaAngleDown size={18} />
                  ) : (
                    <FaAngleUp size={18} />
                  )}
                </button>
              )}
            </a>
            {!collapsed[index] &&
              heading.children &&
              heading.children.length > 0 && (
                <HeadingTree headings={heading.children} />
              )}
          </li>
        ) : null,
      )}
    </ul>
  );
};

export default HeadingTree;
