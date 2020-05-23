import React, { HTMLAttributes } from 'react';
import { FaPodcast } from 'react-icons/fa';

import { HashHeading1, ContentContainer } from './Common';

import commonStyles from '../styles/Common.module.css';
import Note from './Note';

const Card = (props: { children: React.ReactNode }) => {
    return <div className={commonStyles.card}>{props.children}</div>;
};

const CardTitle = (props: HTMLAttributes<HTMLHeadingElement>) => {
    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <h3 className={commonStyles.cardTitle} {...props}>
            {props.children}
        </h3>
    );
};

export default function Podcasts() {
    return (
        <ContentContainer>
            <div>
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
        </ContentContainer>
    );
}
