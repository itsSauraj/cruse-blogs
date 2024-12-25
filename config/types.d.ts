import { UUID } from "crypto";

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
}

export {};
