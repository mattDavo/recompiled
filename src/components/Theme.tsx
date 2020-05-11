import React, { PropsWithChildren } from 'react';

import '../styles/Theme.css';

type Props = PropsWithChildren<React.ReactNode> & {
    color?: string;
    dark?: boolean;
};

const defaultColors = ['green', 'orange', 'blue'];

export default function Theme(props: Props) {
    let { color } = props;
    const { dark } = props;
    if (!color || !defaultColors.includes(color)) {
        color = 'default';
    }

    let darkClass = '';
    if (dark !== undefined) {
        darkClass = dark ? 'theme-dark' : 'theme-light';
    }

    return <div className={`theme-${color} ${darkClass}`}>{props.children}</div>;
}
