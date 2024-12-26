import { UUID } from "crypto";

import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

declare global {
  namespace CruseTypes {
    interface BlogTypes {
      id: UUID;
      slug: string;
      title: string;
      summary: string;
      content: string;
      author: string;
      author_email: string;
      tags: string[];
      date: string;
    }
  }

  namespace BlogTypes {
    type Heading = {
      level: number;
      text: string;
      children: Heading[];
    };
  }

  type Heading = {
    level: number;
    text: string;
    children: Heading[];
  };
}

export {};
