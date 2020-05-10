import React, { HTMLAttributes } from 'react';
import { FaPodcast } from 'react-icons/fa';

import { HashHeading1 } from '../components/Common';

import styles from '../styles/Podcasts.module.css';
import commonStyles from '../styles/Common.module.css';

const Card = (props: { children: React.ReactNode }) => {
    return <div className={commonStyles.card}>{props.children}</div>;
};

const CardTitle = (props: HTMLAttributes<HTMLHeadingElement>) => {
    return (
        <h3 className={commonStyles.cardTitle} {...props}>
            {props.children}
        </h3>
    );
};

const Note = (props: { children: React.ReactNode }) => {
    return <div className={commonStyles.note}>{props.children}</div>;
};

export default function Podcasts() {
    return (
        <div className={styles.container}>
            <div className={commonStyles.textContent}>
                <HashHeading1>
                    Podcasts <FaPodcast size="0.9em" />
                </HashHeading1>
                <Note>Podcasts that I regularly listen to and have contributed to my knowledge of React.</Note>
            </div>
            <Card>
                <CardTitle className={commonStyles.cardTitleLink}>React Podcast</CardTitle>
            </Card>
            <Card>Chats with Kent C. Dodds</Card>
            <Card>Software Engineering Daily</Card>
        </div>
    );
}
