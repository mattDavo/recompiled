import React from 'react';

import styles from '../styles/MainContent.module.css';

export default function MainContent(props: React.PropsWithChildren<React.ReactNode>) {
    return <main className={styles.mainContent}>{props.children}</main>;
}
