import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { HashHeading1, ContentContainer } from '../components/Common';

interface TagPageContext {
    tag: string;
    posts: {
        id: number;
        title: string | null;
        description: string | null;
        slug: string;
    }[];
}

const Tag = styled.span`
    padding: 0.2em 0.25em;
    border-radius: 1em;
    overflow-wrap: normal;
    display: inline-block;
    color: var(--primary-color);
    background-color: var(--primary-color-faint);
`;

export default function TagPage({ pageContext }: { pageContext: TagPageContext }) {
    return (
        <ContentContainer>
            <HashHeading1>
                Posts with tag: <Tag>{pageContext.tag}</Tag>
            </HashHeading1>
            {pageContext.posts.map((post) => {
                return (
                    <Link to={post.slug} key={post.id}>
                        {post.title}
                    </Link>
                );
            })}
        </ContentContainer>
    );
}
