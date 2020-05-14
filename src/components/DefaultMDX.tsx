import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from 'styled-components';

import { ContentContainer } from './Common';

const EditThisPage = styled.a`
    margin-top: 100px;
    /* margin-left: 40px; */
    display: inline-block;
    opacity: 0.6;
    :hover {
        opacity: 0.9;
    }
`;

export default function DefaultMDX(props: {
    data: {
        mdx: {
            id: string;
            body: string;
            frontmatter: {
                title: string;
            };
            fields: {
                rootPath: string;
            };
        };
    };
}) {
    return (
        <ContentContainer>
            <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
            <EditThisPage
                href={`https://www.github.com/mattdavo/recompiledJS/tree/master/${props.data.mdx.fields.rootPath}`}
            >
                Edit this page.
            </EditThisPage>
        </ContentContainer>
    );
}

export const pageQuery = graphql`
    query BlogPostQuery($id: String) {
        mdx(id: { eq: $id }) {
            id
            body
            frontmatter {
                title
            }
            fields {
                rootPath
            }
        }
    }
`;
