import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { HashHeading1, ContentContainer } from '../components/Common';
import { formatDate } from '../helpers';

interface Post {
    id: number;
    title: string | null;
    description: string | null;
    slug: string;
    updated: number;
}

interface TagPageContext {
    tag: string;
    posts: Post[];
}

const Tag = styled.span`
    padding: 0em 0.25em 0.1em;
    border-radius: 1em;
    overflow-wrap: normal;
    display: inline-block;
    color: var(--primary-color);
    background-color: var(--primary-color-faint);
`;

const PostContainer = styled.div`
    box-shadow: 10px 10px 40px -20px black;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.247);
    margin: 20px 0;
    padding: 15px;
    border-radius: 20px;
    background-color: var(--alt-background-color);
    line-height: 1.5em;
`;

const PostHeading = styled.h2`
    margin: 5px 0;

    &:hover {
        color: var(--primary-color);
    }
`;

const PostSubHeading = styled.h4`
    color: var(--secondary-text-color);
    margin: 0;
    font-size: 16px;
`;

const ContainerLink = styled(Link)`
    color: unset;
    text-decoration: unset;
`;

const PostDescription = styled.p``;

function formatPost(post: Post) {
    return (
        <ContainerLink to={post.slug}>
            <PostContainer key={post.id}>
                <PostHeading>{post.title}</PostHeading>
                <PostSubHeading>Updated {formatDate(post.updated)}</PostSubHeading>
                {post.description && <PostDescription>{post.description}</PostDescription>}
            </PostContainer>
        </ContainerLink>
    );
}

export default function TagPage({ pageContext }: { pageContext: TagPageContext }) {
    return (
        <ContentContainer>
            <HashHeading1>
                Posts with tag: <Tag>{pageContext.tag}</Tag>
            </HashHeading1>
            {pageContext.posts.map(formatPost)}
        </ContentContainer>
    );
}
