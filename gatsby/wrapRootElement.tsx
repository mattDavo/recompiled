/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-key */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { HashHeading1, Keyword } from '../src/components/Common';
import Seo from '../src/components/seo';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';

const HR = styled.hr`
    border-width: 0;
    background-color: var(--secondary-text-color);
    background-color: var(--alt-background-color);
    height: 2px;
    margin: 40px 0;
`;

export const Pre = styled.pre`
    text-align: left;
    margin: 1em 0;
    padding: 0.5em;
    overflow-x: auto;
    border-radius: 3px;
    & .token-line {
        line-height: 1.3em;
        height: 1.3em;
    }
    font-family: 'Courier New', Courier, monospace;
`;
export const LineNo = styled.span`
    display: inline-block;
    width: 2em;
    user-select: none;
    opacity: 0.3;
`;

const Code = ({ codeString, language, ...props }: { codeString: string; language: Language }) => {
    return (
        <Highlight {...defaultProps} code={codeString} language={language} theme={theme}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <Pre className={className} style={style}>
                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                            <LineNo>{i + 1}</LineNo>
                            {line.map((token, key) => (
                                <span {...getTokenProps({ token, key })} />
                            ))}
                        </div>
                    ))}
                </Pre>
            )}
        </Highlight>
    );
};

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
