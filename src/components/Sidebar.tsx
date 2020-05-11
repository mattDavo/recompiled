import React, { useState } from 'react';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import styled from 'styled-components';

import styles from '../styles/Sidebar.module.css';
import commonStyles from '../styles/Common.module.css';

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

const SidebarItemChildren = styled.div`
    margin-left: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    padding-left: 10px;
    border-left: var(--alt-background-color) solid 3px;
`;

const SidebarItem = (props: { title: string; link: string; children?: React.ReactNode }): JSX.Element => {
    const location = useLocation();
    let highlightClass = '';
    const [expanded, setExpanded] = useState(false);

    if (location.pathname === props.link) {
        highlightClass = commonStyles.isPrimary;
    }

    if (!props.children) {
        return (
            <Link to={props.link} className={`${styles.sidebarItem} ${highlightClass}`}>
                {props.title}
            </Link>
        );
    }

    return (
        <div>
            <RelativeDiv className={highlightClass}>
                <Link to={props.link} className={`${styles.sidebarParentItem} ${highlightClass}`}>
                    {props.title}
                </Link>
                {expanded ? (
                    <IconButton onClick={() => setExpanded(!expanded)}>
                        <StyledUpIcon size="2em" />
                    </IconButton>
                ) : (
                    <IconButton onClick={() => setExpanded(!expanded)}>
                        <StyledDownIcon size="2em" />
                    </IconButton>
                )}
            </RelativeDiv>
            {expanded && <SidebarItemChildren>{props.children}</SidebarItemChildren>}
        </div>
    );
};

export default function Sidebar() {
    return (
        <nav className={styles.sidebarContainer}>
            <div className={styles.sidebar}>
                <SidebarItem title="Home" link="/" />
                <SidebarItem title="React" link="/react">
                    <SidebarItem title="What's React?" link="/react/what-is-react" />
                    <SidebarItem title="Where do I start?" link="/react/getting-started" />
                </SidebarItem>
                <SidebarItem title="Articles" link="/articles" />
                <SidebarItem title="Topics" link="/topics" />
                <SidebarItem title="Open Source" link="/open-source" />
                <SidebarItem title="Podcasts" link="/podcasts" />
                <SidebarItem title="Resources" link="/resources" />
                <SidebarItem title="Contributing" link="/contributing" />
            </div>
        </nav>
    );
}
