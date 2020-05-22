import React from 'react';
import { graphql } from 'gatsby';

import Seo from '../components/Seo';
import Post from '../models/Post';
import { formatPost } from '../helpers';
import { ContentContainer, HashHeading1 } from '../components/Common';

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
            <Seo title="Articles" />
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
