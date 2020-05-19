import React from 'react';
import { motion } from 'framer-motion';

import styles from '../../styles/Sidebar.module.css';
import SidebarItem from './SidebarItem';

const variants = {
    open: {
        transition: { staggerChildren: 0.05, delayChildren: 0.5 },
    },
};

interface SidebarContentProps {
    onItemClick?: ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void) | undefined;
}

function SidebarContent({ onItemClick }: SidebarContentProps) {
    return (
        <motion.div className={styles.sidebar} variants={variants}>
            <SidebarItem title="Home" link="/" onClick={onItemClick} />
            <SidebarItem title="The Web" link="/the-web" onClick={onItemClick} />
            <SidebarItem title="React" link="/react" onClick={onItemClick}>
                <SidebarItem title="What's React?" link="/react/what-is-react" onClick={onItemClick} />
                <SidebarItem title="Where do I start?" link="/react/getting-started" onClick={onItemClick} />
            </SidebarItem>
            <SidebarItem title="Articles" link="/articles" onClick={onItemClick} />
            <SidebarItem title="Topics" link="/topics" onClick={onItemClick} />
            <SidebarItem title="Open Source" link="/open-source" onClick={onItemClick} />
            <SidebarItem title="Podcasts" link="/podcasts" onClick={onItemClick}>
                <SidebarItem title="Review" link="/podcasts/review" onClick={onItemClick} />
            </SidebarItem>
            <SidebarItem title="Resources" link="/resources" onClick={onItemClick} />
            <SidebarItem title="Contributing" link="/contributing" onClick={onItemClick} />
        </motion.div>
    );
}

export default SidebarContent;
