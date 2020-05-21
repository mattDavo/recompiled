import React from 'react';
import { graphql } from 'gatsby';

import { ContentContainer, HashHeading1 } from '../components/Common';
import { formatPost } from '../helpers';
import Post from '../models/Post';

interface PodacastReviewPageProps {
    data: {
        allMdx: {
            edges: {
                node: Post;
            }[];
        };
    };
}

export default function ArticlesPage(props: PodacastReviewPageProps) {
    const {
        data: {
            allMdx: { edges },
        },
    } = props;

    const posts = edges.map((edge) => edge.node);

    return (
        <ContentContainer>
            <HashHeading1>Articles</HashHeading1>A collection of articles written about any topic.
            {posts.map(formatPost)}
        </ContentContainer>
    );
}

export const query = graphql`
    query ArticlesIndex {
        allMdx(
            filter: { fileAbsolutePath: { regex: "//content/articles/" } }
            sort: { fields: frontmatter___published, order: DESC }
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        description
                        slug
                        published
                        updated
                    }
                }
            }
        }
    }
`;
