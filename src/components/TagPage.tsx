import React from 'react';

import { HashHeading1, ContentContainer } from '../components/Common';
import { formatPost } from '../helpers';
import Post from '../models/Post';
import Tag from './Tag';

interface TagPageContext {
    tag: string;
    posts: Post[];
}

export default function TagPage({ pageContext }: { pageContext: TagPageContext }) {
    const posts = pageContext.posts.sort((a, b) => b.frontmatter.published - a.frontmatter.published);

    return (
        <ContentContainer>
            <HashHeading1>
                Posts with tag: <Tag>{pageContext.tag}</Tag>
            </HashHeading1>
            {posts.map(formatPost)}
        </ContentContainer>
    );
}
