import React from 'react';
import { graphql } from 'gatsby';

import { ContentContainer, HashHeading1 } from '../../components/Common';
import { formatPost } from '../../helpers';
import Post from '../../models/Post';

interface PodacastReviewPageProps {
    data: {
        allMdx: {
            edges: {
                node: Post;
            }[];
        };
    };
}

export default function PodcastReview(props: PodacastReviewPageProps) {
    const {
        data: {
            allMdx: { edges },
        },
    } = props;

    const posts = edges.map((edge) => edge.node);

    console.log(props);

    return (
        <ContentContainer>
            <HashHeading1>Podcast Review</HashHeading1>I listen to a LOT of podcasts and here are some reviews of
            podcasts that I found particularly insightful.
            {posts.map(formatPost)}
        </ContentContainer>
    );
}

export const query = graphql`
    query PodcastReviewIndex {
        allMdx(
            filter: { fileAbsolutePath: { regex: "//content/podcasts/review/" } }
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
