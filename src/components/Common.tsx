import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';

import styles from '../styles/Common.module.css';

export function HashHeading1(props: HTMLAttributes<HTMLHeadingElement>) {
    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <h1 className={styles.heading1} {...props}>
            <span className={styles.hash}>#</span> {props.children}
        </h1>
    );
}

export function HashHeading2(props: { children: React.ReactNode }) {
    return (
        <h2 className={styles.heading2}>
            <span className={styles.hash}>##</span> {props.children}
        </h2>
    );
}

export function Keyword(props: { children: React.ReactNode }) {
    return <span className={styles.keyword}>{props.children}</span>;
}

const maxWidth = '800px';
const mdxContainerMargin = '16px';

const ContentContainer = styled.main`
    max-width: ${maxWidth};
    margin: 20px 0;
    line-height: 1.5em;
    font-size: 18px;
    margin-left: max(calc((100vw - ${maxWidth}) / 2 - var(--sidebar-width)), ${mdxContainerMargin});
    margin-right: ${mdxContainerMargin};
    width: 100%;
    display: block;
`;

export { ContentContainer };
