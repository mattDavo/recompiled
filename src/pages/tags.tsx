import React from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';

import Tag from '../components/Tag';
import Seo from '../components/Seo';
import { sanitizeTags } from '../helpers';
import { ContentContainer, HashHeading1 } from '../components/Common';

interface TagsPageProps {
    data: {
        allMdx: {
            edges: {
                node: {
                    frontmatter: {
                        tags: string[];
                    };
                };
            }[];
        };
    };
}

const TagLink = styled(Link)`
    padding: 10px 0;
    line-height: 1.5em;

    &:hover {
        background-color: unset;
    }
`;

const PaddedTag = styled(Tag)`
    margin: 10px;
    margin-left: 0;
`;

export default function TagsPage(props: TagsPageProps) {
    const {
        data: {
            allMdx: { edges },
        },
    } = props;

    const tags = sanitizeTags(
        Array.from(
            new Set(
                edges
                    .map((edge) => edge.node.frontmatter.tags)
                    .reduce((p, c) => {
                        return [...p, ...(c ? c : [])];
                    }, []),
            ),
        ),
    ).sort();
    return (
        <ContentContainer>
            <Seo title="Tags" />
            <HashHeading1>Tags</HashHeading1>
            Browse articles by topic.
            <h1>
                {tags.map((tag) => {
                    return (
                        <TagLink key={tag} to={`/tags/${tag}`}>
                            <PaddedTag>{tag}</PaddedTag>
                        </TagLink>
                    );
                })}
            </h1>
        </ContentContainer>
    );
}

export const query = graphql`
    query TagsQuery {
        allMdx {
            edges {
                node {
                    frontmatter {
                        tags
                    }
                }
            }
        }
    }
`;
