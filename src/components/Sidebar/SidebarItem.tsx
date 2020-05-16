import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { motion } from 'framer-motion';
import { useLocation } from '@reach/router';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

import styles from '../../styles/Sidebar.module.css';
import commonStyles from '../../styles/Common.module.css';
import MobileContext from '../MobileContext';

const RelativeDiv = styled.div`
    position: relative;
`;

const StyledIcon = styled.svg`
    position: relative;

    border-radius: 0.5em;
    height: 100%;
    width: 100%;
`;

const IconButton = styled.button`
    background-color: unset;
    position: absolute;
    padding: 5px;
    border-radius: 0.5em;
    height: 30px;
    width: 30px;
    right: 20px;
    top: 50%;
    margin: -15px;
    border-width: 0;
    color: inherit;

    :hover,
    :focus {
        background-color: #424242;
        outline: none;
    }
`;

const StyledUpIcon = StyledIcon.withComponent(BsChevronUp);
const StyledDownIcon = StyledIcon.withComponent(BsChevronDown);

const SidebarItemChildren = styled(motion.div)`
    margin-left: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    padding-left: 10px;
    border-left: var(--alt-background-color) solid 3px;
`;

interface SidebarItemProps {
    title: string;
    link: string;
    children?: React.ReactNode;
    onClick?: ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void) | undefined;
}

const sidebarItemVariants = {
    open: {
        opacity: 1,
    },
    closed: {
        opacity: 0,
        duration: 0,
    },
};

const SidebarItem = (props: SidebarItemProps): JSX.Element => {
    const location = useLocation();
    let highlightClass = '';
    const [expanded, setExpanded] = useState(false);

    if (location.pathname === props.link) {
        highlightClass = commonStyles.isPrimary;
    }

    const rootItem = (
        <MobileContext.Consumer>
            {(isMobile) => {
                return (
                    <motion.div whileTap={{ scale: isMobile ? 1 : 0.95 }} variants={sidebarItemVariants}>
                        <Link
                            to={props.link}
                            className={`${styles.sidebarItem} ${highlightClass}`}
                            onClick={props.onClick}
                        >
                            {props.title}
                        </Link>
                    </motion.div>
                );
            }}
        </MobileContext.Consumer>
    );

    if (!props.children) {
        return rootItem;
    }

    return (
        <div>
            <RelativeDiv className={highlightClass}>
                {rootItem}
                <motion.div variants={sidebarItemVariants}>
                    {expanded ? (
                        <IconButton onClick={() => setExpanded(!expanded)}>
                            <StyledUpIcon size="2em" />
                        </IconButton>
                    ) : (
                        <IconButton onClick={() => setExpanded(!expanded)}>
                            <StyledDownIcon size="2em" />
                        </IconButton>
                    )}
                </motion.div>
            </RelativeDiv>
            {expanded && <SidebarItemChildren variants={sidebarItemVariants}>{props.children}</SidebarItemChildren>}
        </div>
    );
};

export default SidebarItem;
