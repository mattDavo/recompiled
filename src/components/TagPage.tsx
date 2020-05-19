import React from 'react';
import styled from 'styled-components';

import { HashHeading1, ContentContainer } from '../components/Common';
import { formatPost } from '../helpers';
import Post from '../models/Post';

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
