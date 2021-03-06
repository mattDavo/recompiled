/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-key */
import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { HashHeading1, Keyword } from '../src/components/Common';
import Seo from '../src/components/Seo';
import Code from '../src/components/Code';
import blockquote from '../src/components/Note';

const HR = styled.hr`
    border-width: 0;
    background-color: var(--secondary-text-color);
    background-color: var(--alt-background-color);
    height: 2px;
    margin: 40px 0;
`;

const h2 = styled.h2`
    margin-top: 50px;
    font-size: 28px;
`;

const h3 = styled.h3`
    margin-top: 50px;
    font-size: 22px;
    margin-bottom: 15px;
`;

function InlineCode(props: object) {
    return (
        <code
            style={{ backgroundColor: 'var(--inline-pre-background-color)', borderRadius: '3px', padding: '0 3px' }}
            {...props}
        />
    );
}

const base = css`
    font-size: 16px;
`;

const p = styled.p`
    ${base}
`;

const Primary = styled.span`
    ${base}
    color: var(--primary-color);
`;

const comps = {
    h1: HashHeading1,
    h2,
    h3,
    hr: HR,
    Link,
    Keyword,
    p,
    'p.inlineCode': InlineCode,
    blockquote,
    Primary,
    strong: Primary,
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
