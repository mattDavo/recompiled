interface Frontmatter {
    title: string | null;
    description: string | null;
    slug: string;
    updated: number;
    published: number;
    tags: string[];
    links: string[];
    authors: string[];
}

export default interface Post {
    id: number;
    frontmatter: Frontmatter;
}
