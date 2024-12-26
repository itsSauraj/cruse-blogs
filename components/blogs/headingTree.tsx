import React, { useState, useEffect } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Tooltip } from "@nextui-org/react";

import { generateSlug } from "@/utils/functions";

const HeadingTree: React.FC<{ headings: BlogTypes.Heading[] }> = ({
  headings,
}) => {
  if (!headings || headings.length === 0) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [collapsed, setCollapsed] = useState<{ [key: number]: boolean }>({});
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentElement, setCurrentElement] = useState<string | null>(null);

  const toggleCollapse = (index: number) => {
    setCollapsed((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleScroll = () => {
    headings.forEach((heading) => {
      const element = document.getElementById(generateSlug(heading.text));

      if (element) {
        const rect = element.getBoundingClientRect();

        if (rect.top >= 0 && rect.bottom <= window.innerHeight / 3) {
          setCurrentElement(generateSlug(heading.text));
          window.history.replaceState(
            null,
            "",
            `#${generateSlug(heading.text)}`,
          );
        }
      }
    });
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentElement(window.location.hash);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (currentElement) {
      document.querySelectorAll("[data-heading-id]").forEach((el) => {
        el.classList.remove("bg-gray-200", "dark:bg-gray-600");
      });

      const element = document.querySelector(
        `[data-heading-id="${currentElement}"]`,
      );

      if (element) {
        element.classList.add("bg-gray-200", "dark:bg-gray-600");
      }
    }
  }, [currentElement]);

  return (
    <ul className="w-full">
      {headings.map((heading, index) =>
        heading.text ? (
          <li
            key={index}
            className="border-3 border-l-gray-400 border-t-0 border-b-0 border-r-0 pl-3"
          >
            <a
              className={`cursor-pointer bg-none border-none p-1 rounded-md text-left w-full text-ellipsis overflow-hidden text-wrap flex justify-between items-center dark:hover:bg-gray-600 hover:bg-gray-200`}
              data-heading-id={generateSlug(heading.text)}
              href={`#${generateSlug(heading.text)}`}
              onClick={() => setCurrentElement(generateSlug(heading.text))}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCollapse(index);
                  }}
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
