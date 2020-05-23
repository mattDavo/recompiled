import React from 'react';

import commonStyles from '../styles/Common.module.css';

export default function Note(props: { children: React.ReactNode }) {
    return <blockquote className={commonStyles.note}>{props.children}</blockquote>;
}
