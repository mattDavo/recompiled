import React, { Fragment } from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from 'styled-components';

import Seo from './Seo';
import MobileContext from './MobileContext';
import { Keyword } from './Common';
import { formatDate, sanitizeTags } from '../helpers';

const maxWidth = '1140px';
const mdxContainerMargin = '20px';

const MDXContainer = styled.main`
    max-width: ${maxWidth};
    margin: ${mdxContainerMargin};
    line-height: 1.5em;
    font-size: 18px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    display: block;
    min-width: 0;
`;

const EditThisPage = styled.a`
    margin-top: 100px;
    display: inline-block;
    opacity: 0.6;
    :hover {
        opacity: 0.9;
    }
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-width: 0;
`;

const ContentCol = styled.div`
    display: block;
    max-width: 100%;
    flex: 1 0;
    width: 100%;
    padding: 0 16px;
    overflow-x: auto;

    --content-margin: 16px;
`;

const MetaCol = styled.div`
    flex: 0 0 25%;
    max-width: 25%;
    display: block;
    width: 100%;
    padding: 0 16px;
`;

const MetaContent = styled.div`
    position: sticky;
    top: 100px;
    overflow-y: auto;
    border-left: 1px solid var(--text-color);
    padding-left: 16px;
    font-size: 14px;
`;

const MetaList = styled.ul`
    list-style: none;
    padding: 0;
`;

const Tag = styled(Link)`
    padding: 0 3px;
    border-radius: 10px;
    overflow-wrap: normal;
    display: inline-block;

    &:hover,
    :focus {
        background-color: var(--primary-color-faint);
    }
`;

const LinkList = styled.ul`
    padding-left: 20px;
`;

function formatTags(tags: string[]) {
    tags = sanitizeTags(tags);
    return tags.map((t) => {
        const tag = t.trim().replace(/\s+/, '-');
        if (tag.length == 0) return null;
        return (
            <Fragment key={tag}>
                <Tag to={`/tags/${tag}`}>{tag}</Tag>{' '}
            </Fragment>
        );
    });
}

interface LinkData {
    title: string;
    to: string;
}

function formatLinks(links: LinkData[]) {
    return links.map((link) => {
        return (
            link &&
            link.title &&
            link.to && (
                <li key={link.to}>
                    <a href={link.to}>{link.title}</a>{' '}
                </li>
            )
        );
    });
}

function formatAuthors(authors: Author[]) {
    return authors.map((author) => {
        return <Keyword key={author.username}>{`@${author.username}`}</Keyword>;
    });
}

interface Author {
    name: string;
    username: string;
    contact: {
        email: string | null;
        github: string | null;
        website: string | null;
        twitter: string | null;
    };
}

export default function DefaultMDX(props: {
    data: {
        mdx: {
            id: string;
            body: string;
            frontmatter: {
                title: string;
                published: number;
                updated: number;
                tags: string[] | null;
                links: LinkData[] | null;
                authors: string[];
            };
            fields: {
                rootPath: string;
            };
        };
        allPerson: {
            edges: {
                node: Author;
            }[];
        };
    };
}) {
    const {
        data: {
            mdx: {
                frontmatter: { title, tags, links, authors },
            },
            allPerson: { edges },
        },
    } = props;

    const authorsData = edges.map((edge) => edge.node).filter((node) => authors && authors.includes(node.username));

    return (
        <MDXContainer>
            <Seo title={title} />
            <MobileContext.Consumer>
                {(isMobile) => {
                    if (isMobile) {
                        return (
                            <ContentCol>
                                <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
                                <EditThisPage
                                    href={`https://www.github.com/mattdavo/recompiled/tree/master/${props.data.mdx.fields.rootPath}`}
                                >
                                    Edit this page.
                                </EditThisPage>
                            </ContentCol>
                        );
                    }
                    return (
                        <Row
                            style={{ flexDirection: isMobile ? 'column' : 'row', display: isMobile ? 'block' : 'flex' }}
                        >
                            <ContentCol>
                                <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
                                <EditThisPage
                                    href={`https://www.github.com/mattdavo/recompiled/tree/master/${props.data.mdx.fields.rootPath}`}
                                >
                                    Edit this page.
                                </EditThisPage>
                            </ContentCol>
                            {!isMobile && (
                                <MetaCol>
                                    <MetaContent>
                                        <MetaList>
                                            <li>
                                                <b>Published: </b>
                                                {formatDate(props.data.mdx.frontmatter.published)}
                                            </li>
                                            <li>
                                                <b>Updated: </b>
                                                {formatDate(props.data.mdx.frontmatter.updated)}
                                            </li>
                                            {authorsData.length > 0 && (
                                                <li>
                                                    <b>Authors: </b>
                                                    {formatAuthors(authorsData)}
                                                </li>
                                            )}
                                            {tags && tags.length > 0 && (
                                                <li>
                                                    <b>Tags: </b>
                                                    {formatTags(tags)}
                                                </li>
                                            )}
                                            {links && links.length > 0 && (
                                                <li>
                                                    <b>Links: </b>
                                                    <LinkList>{formatLinks(links)}</LinkList>
                                                </li>
                                            )}
                                        </MetaList>
                                    </MetaContent>
                                </MetaCol>
                            )}
                        </Row>
                    );
                }}
            </MobileContext.Consumer>
        </MDXContainer>
    );
}

export const pageQuery = graphql`
    query BlogPostQuery($id: String) {
        mdx(id: { eq: $id }) {
            id
            body
            frontmatter {
                title
                published
                updated
                tags
                links {
                    title
                    to
                }
                authors
            }
            fields {
                rootPath
            }
        }
        allPerson {
            edges {
                node {
                    name
                    username
                    contact {
                        email
                        twitter
                        website
                        github
                    }
                }
            }
        }
    }
`;
