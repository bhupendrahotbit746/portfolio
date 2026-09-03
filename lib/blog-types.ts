export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BlogPostInput = {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  published: boolean;
};
