/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';

import MobileContent from './MobileContext';

export const LineNo = styled.span`
    display: inline-block;
    width: 2em;
    user-select: none;
    opacity: 0.3;
`;

export const Pre = styled.pre`
    display: block;
    margin: 1em 0;
    padding: 0.5em;
    border-radius: 5px;
    text-align: left;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch !important;
    white-space: pre-wrap;
    white-space: pre;
    font-family: 'Courier New', Courier, monospace;
    font-size: 16px;

    @media only screen and (max-width: 799px) {
        margin-left: calc(-1 * var(--content-margin));
        margin-right: calc(-1 * var(--content-margin));
        border-radius: 0px;
    }
`;

export default function Code({ codeString, language }: { codeString: string; language: Language }) {
    return (
        <Highlight {...defaultProps} code={codeString} language={language} theme={theme}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <MobileContent.Consumer>
                    {(isMobile) => {
                        return (
                            <Pre className={className} style={style}>
                                {tokens.map((line, i) => (
                                    <div {...getLineProps({ line, key: i })}>
                                        {!isMobile && <LineNo>{i + 1}</LineNo>}
                                        {line.map((token, key) => (
                                            <span {...getTokenProps({ token, key })} />
                                        ))}
                                    </div>
                                ))}
                            </Pre>
                        );
                    }}
                </MobileContent.Consumer>
            )}
        </Highlight>
    );
}
