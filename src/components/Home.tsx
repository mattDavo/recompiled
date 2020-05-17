import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { motion } from 'framer-motion';

import styles from '../styles/Home.module.css';
import commonStyles from '../styles/Common.module.css';

import { HashHeading1 } from './Common';

const exampleContent = [
    {
        title: 'Blah blah blah',
        date: 'Published on 20/20/2020',
        content:
            'To get started with React Router in a web app, you’ll need a React web app. If you need to create one, we recommend you try Create React App. It’s a popular tool that works really well with React Router.',
    },
    {
        title: 'Blah blah blah2',
        date: 'Published on 20/20/2020',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        title: 'Blah blah blah3',
        date: 'Published on 20/20/2020',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        title: 'Blah blah blah4',
        date: 'Published on 20/20/2020',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
];

const Post = (data: { title: string; date: string; content: string }) => {
    return (
        <motion.div
            className={styles.postContainer}
            key={data.title}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className={commonStyles.card}>
                <h1>{data.title}</h1>
                <h4>{data.date}</h4>
                <p>{data.content}</p>
            </div>
        </motion.div>
    );
};

const Posts = () => {
    return <div className={styles.postsContainer}>{exampleContent.map(Post)}</div>;
};

const EmojiMotionDiv = styled(motion.div)`
    display: inline-block;
`;

const Welcome = () => {
    return (
        <h1 className={styles.heading}>
            {'Welcome! '}
            <EmojiMotionDiv
                whileHover={{ scale: 1.3, rotate: 360 }}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <span role="img" aria-label="Celebration">
                    🥳
                </span>
            </EmojiMotionDiv>
        </h1>
    );
};

export default function Home() {
    return (
        <div className={styles.container}>
            <Welcome />
            <p className={styles.subHeading}>
                Welcome to <span className={commonStyles.keyword}>Recompiled[JT]S!</span>{' '}
                {
                    "Here you'll find articles written by Matt Davidson on anything related to learning frontend web development in javascript/ typescript with a focus on using "
                }
                <a href="https://reactjs.org" className={commonStyles.keyword}>
                    ReactJS
                </a>
                . Here you can join me on my journey to becoming the best web developers we can be. You will find
                original articles on fundamentals, links and reviews of other resources, using React libraries, options
                in tooling, and more!
                <br />
                <br />
                <Link to="/contributing" className={commonStyles.keyword}>
                    Contributions
                </Link>
                {' are welcomed and encouraged!'}
                <br />
                <br />
            </p>
            <div className={commonStyles.textContent}>
                <hr className={commonStyles.divider} />
                <HashHeading1 className={commonStyles.heading2}>Latest</HashHeading1>
            </div>
            <Posts />
        </div>
    );
}
