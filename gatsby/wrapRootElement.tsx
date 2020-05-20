/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-key */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { HashHeading1, Keyword } from '../src/components/Common';
import Seo from '../src/components/seo';
import Code from '../src/components/Code';

const HR = styled.hr`
    border-width: 0;
    background-color: var(--secondary-text-color);
    background-color: var(--alt-background-color);
    height: 2px;
    margin: 40px 0;
`;

const comps = {
    h1: HashHeading1,
    hr: HR,
    Link,
    Keyword,
    pre: ({ children: { props } }) => {
        if (props.mdxType === 'code') {
            return (
                <Code
                    codeString={props.children.trim()}
                    language={props.className && props.className.replace('language-', '')}
                    {...props}
                />
            );
        }
    },
};

const wrapRootElement = ({ element }: { element: React.ReactNode }) => {
    return (
        <MDXProvider components={comps}>
            <Seo />
            {element}
        </MDXProvider>
    );
};

export default wrapRootElement;
