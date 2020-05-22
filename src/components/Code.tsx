/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';

export const LineNo = styled.span`
    display: inline-block;
    width: 2em;
    user-select: none;
    opacity: 0.3;
`;

export const Pre = styled.pre`
    text-align: left;
    margin: 1em 0;
    padding: 0.5em;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    border-radius: 3px;
    & .token-line {
        line-height: 1.3em;
        height: 1.3em;
    }
    font-family: 'Courier New', Courier, monospace;
`;

export default function Code({ codeString, language }: { codeString: string; language: Language }) {
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
}
