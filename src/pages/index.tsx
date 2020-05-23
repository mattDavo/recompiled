import React from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';
import { motion } from 'framer-motion';

import SEO from '../components/Seo';
import Post from '../models/Post';
import styles from '../styles/Home.module.css';
import commonStyles from '../styles/Common.module.css';
import { formatPost } from '../helpers';
import { HashHeading1 } from '../components/Common';

const Posts = ({ posts }: { posts: Post[] }) => {
    return <div>{posts.map(formatPost)}</div>;
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

interface HomePageProps {
    data: {
        allMdx: {
            edges: {
                node: Post;
            }[];
        };
    };
}

export default function Home(props: HomePageProps) {
    const {
        data: {
            allMdx: { edges },
        },
    } = props;

    const posts = edges.map((edge) => edge.node);

    return (
        <div className={styles.container}>
            <SEO />
            <Welcome />
            <p className={styles.subHeading}>
                Welcome to <span className={commonStyles.keyword}>Recompiled!</span>{' '}
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
            <hr className={commonStyles.divider} />
            <HashHeading1 className={commonStyles.heading2}>Latest</HashHeading1>
            <Posts posts={posts} />
        </div>
    );
}

export const query = graphql`
    query HomeFeed {
        allMdx(
            sort: { fields: frontmatter___published, order: DESC }
            limit: 10
            filter: { frontmatter: { wip: { ne: true } } }
        ) {
            edges {
                node {
                    id
                    fileAbsolutePath
                    frontmatter {
                        title
                        description
                        slug
                        published
                        updated
                    }
                }
            }
        }
    }
`;
