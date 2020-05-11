import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { HashHeading1, Keyword } from './src/components/Common';
import Seo from './src/components/seo';

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
