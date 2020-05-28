/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Fragment } from 'react';
import styled from 'styled-components';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';

import MobileContent from './MobileContext';

const LineNo = styled.span`
    display: inline-block;
    width: 2em;
    user-select: none;
    opacity: 0.7;
`;

const FileName = styled.span`
    display: block;
    margin: 10px 20px;
    color: var(--text-color);
    opacity: 0.8;
`;

const Divider = styled.div`
    border: none;
    background-color: var(--alt-background-color);
    height: 2px;
    margin: 5px -0.5em;
`;

const Pre = styled.pre`
    display: block;
    margin: 1em 0;
    padding: 0.5em;
    border-radius: 5px;
    text-align: left;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch !important;
    white-space: pre-wrap;
    white-space: pre;
    font-family: 'Courier New', Courier, monospace;
    font-size: 16px;
    background-color: black;

    @media only screen and (max-width: 799px) {
        margin-left: calc(-1 * var(--content-margin));
        margin-right: calc(-1 * var(--content-margin));
        border-radius: 0px;
    }
`;

export default function Code({ codeString, language }: { codeString: string; language: Language }) {
    const languageMatch = language && language.match(/^([^:]*)/);
    const actualLanguage = languageMatch && languageMatch[1];
    const filenameMatch = language && language.match(/title=([^:]*)/);
    const filename = filenameMatch && filenameMatch[1];
    return (
        <Highlight {...defaultProps} code={codeString} language={actualLanguage as Language} theme={theme}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <MobileContent.Consumer>
                    {(isMobile) => {
                        return (
                            // eslint-disable-next-line styled-components-a11y/no-noninteractive-tabindex
                            <Pre className={className} style={style} tabIndex={0} role="region" aria-label="Code Block">
                                {filename && (
                                    <Fragment>
                                        <FileName>{filename}</FileName>
                                        <Divider />
                                    </Fragment>
                                )}
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
