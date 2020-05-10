import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { HashHeading1 } from './src/components/Common';
import styled from 'styled-components';

const HR = styled.hr`
    border-width: 0;
    background-color: var(--secondary-text-color);
    background-color: var(--alt-background-color);
    height: 2px;
    margin: 40px 0;
`;

const comps = {
    Test: ({ children }) => <h1>{children}</h1>,
    h1: HashHeading1,
    hr: HR,
};

const wrapRootElement = ({ element }) => {
    return <MDXProvider components={comps}>{element}</MDXProvider>;
};

export default wrapRootElement;
