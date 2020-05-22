import React from 'react';
import { graphql, Link } from 'gatsby';

import Seo from '../components/Seo';
import { HashHeading1, ContentContainer } from '../components/Common';

interface ReactPageProps {
    data: {
        allMdx: {
            edges: {
                node: {
                    id: string;
                    frontmatter: {
                        title: string;
                        slug: string;
                    };
                };
            }[];
        };
    };
}

export default function ReactPage(props: ReactProps) {
    return (
        <ContentContainer>
            <Seo title="React" />
            <HashHeading1>React ⚛️</HashHeading1>
            <ol>
                {props.data.allMdx.edges.map((edge) => {
                    return (
                        <li key={edge.node.id}>
                            <Link to={edge.node.frontmatter.slug}>{edge.node.frontmatter.title}</Link>
                        </li>
                    );
                })}
            </ol>
        </ContentContainer>
    );
}

export const query = graphql`
    query BasicsIndex {
        allMdx(filter: { fileAbsolutePath: { regex: "//content/react/" } }, sort: { fields: frontmatter___order }) {
            edges {
                node {
                    id
                    fileAbsolutePath
                    frontmatter {
                        title
                        slug
                    }
                }
            }
        }
    }
`;
