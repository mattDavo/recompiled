import React from 'react';

import { ContainerLink, PostContainer, PostHeading, PostSubHeading, PostDescription } from '../components/Post';
import Post from '../models/Post';

export function formatDate(unixTimestamp: number): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(unixTimestamp * 1000);
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatPost(post: Post) {
    return (
        <ContainerLink to={post.frontmatter.slug} key={post.id}>
            <PostContainer>
                <PostHeading>{post.frontmatter.title}</PostHeading>
                <PostSubHeading>Published {formatDate(post.frontmatter.published)}</PostSubHeading>
                {post.frontmatter.description && <PostDescription>{post.frontmatter.description}</PostDescription>}
            </PostContainer>
        </ContainerLink>
    );
}
