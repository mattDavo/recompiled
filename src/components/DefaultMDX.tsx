import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from 'styled-components';

import MobileContext from './MobileContext';

const maxWidth = '1140px';
const mdxContainerMargin = '20px';

const MDXContainer = styled.main`
    max-width: ${maxWidth};
    margin: ${mdxContainerMargin};
    line-height: 1.5em;
    font-size: 18px;
    margin-left: max(calc((100vw - ${maxWidth}) / 2 - var(--sidebar-width)), ${mdxContainerMargin});
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    display: block;
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
`;

const ContentCol = styled.div`
    display: block;
    max-width: 100%;
    flex: 1 0;
    width: 100%;
    padding: 0 16px;
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

function formatDate(unixTimestamp: number) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(unixTimestamp * 1000);
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function formatTags(tags: string[]) {
    return tags.map((t) => {
        const tag = t.trim().replace(/\s+/, '-');
        if (tag.length == 0) return null;
        return (
            <>
                <Tag key={tag} to={`/tags/${tag}`}>
                    {tag}
                </Tag>{' '}
            </>
        );
    });
}

function formatLinks(links: string[]) {}

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
                links: string[] | null;
            };
            fields: {
                rootPath: string;
            };
        };
    };
}) {
    const {
        data: {
            mdx: {
                frontmatter: { tags, links },
            },
        },
    } = props;

    return (
        <MDXContainer>
            <MobileContext.Consumer>
                {(isMobile) => {
                    return (
                        <Row style={{ flexDirection: isMobile ? 'column' : 'row' }}>
                            <ContentCol>
                                <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
                                <EditThisPage
                                    href={`https://www.github.com/mattdavo/recompiledJS/tree/master/${props.data.mdx.fields.rootPath}`}
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
                                                {formatDate(props.data.mdx.frontmatter.published)}
                                            </li>
                                            {tags && tags.length > 0 && (
                                                <li>
                                                    <b>Tags: </b>
                                                    {formatTags(tags)}
                                                </li>
                                            )}
                                            {links && links.length > 0 && (
                                                <li>
                                                    <b>Tags: </b>
                                                    {formatLinks(links)}
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
                links
            }
            fields {
                rootPath
            }
        }
    }
`;
