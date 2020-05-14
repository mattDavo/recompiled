import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';

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

interface SidebarItemProps {
    title: string;
    link: string;
    children?: React.ReactNode;
    onClick?: ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void) | undefined;
}

const SidebarItem = (props: SidebarItemProps): JSX.Element => {
    const location = useLocation();
    let highlightClass = '';
    const [expanded, setExpanded] = useState(false);

    if (location.pathname === props.link) {
        highlightClass = commonStyles.isPrimary;
    }

    if (!props.children) {
        return (
            <Link to={props.link} className={`${styles.sidebarItem} ${highlightClass}`} onClick={props.onClick}>
                {props.title}
            </Link>
        );
    }

    return (
        <div>
            <RelativeDiv className={highlightClass}>
                <Link
                    to={props.link}
                    className={`${styles.sidebarParentItem} ${highlightClass}`}
                    onClick={props.onClick}
                >
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

interface SidebarContentProps {
    onItemClick?: ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void) | undefined;
}

function SidebarContent({ onItemClick }: SidebarContentProps) {
    return (
        <div className={styles.sidebar}>
            <SidebarItem title="Home" link="/" onClick={onItemClick} />
            <SidebarItem title="The Web" link="/the-web" onClick={onItemClick} />
            <SidebarItem title="React" link="/react" onClick={onItemClick}>
                <SidebarItem title="What's React?" link="/react/what-is-react" onClick={onItemClick} />
                <SidebarItem title="Where do I start?" link="/react/getting-started" onClick={onItemClick} />
            </SidebarItem>
            <SidebarItem title="Articles" link="/articles" onClick={onItemClick} />
            <SidebarItem title="Topics" link="/topics" onClick={onItemClick} />
            <SidebarItem title="Open Source" link="/open-source" onClick={onItemClick} />
            <SidebarItem title="Podcasts" link="/podcasts" onClick={onItemClick} />
            <SidebarItem title="Resources" link="/resources" onClick={onItemClick} />
            <SidebarItem title="Contributing" link="/contributing" onClick={onItemClick} />
        </div>
    );
}

function Sidebar() {
    return (
        <nav className={styles.sidebarContainer}>
            <SidebarContent />
        </nav>
    );
}

const FixedToggle = styled.button`
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 101;
    width: 80px;
    height: 50px;
    background-color: var(--alt-background-color);
    color: var(--primary-color);
    border: none;
    border-radius: 8px;
`;

interface SidebarToggleProps {
    onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
    open: boolean;
}

function SidebarToggle({ onClick, open }: SidebarToggleProps) {
    return (
        <FixedToggle onClick={onClick}>
            {open ? (
                <MdClose size="3.5em" style={{ verticalAlign: 'center' }} />
            ) : (
                <GiHamburgerMenu size="3em" style={{ verticalAlign: 'center' }} />
            )}
        </FixedToggle>
    );
}

function MobileSidebar() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        show && (document.body.style.overflow = 'hidden');
        !show && (document.body.style.overflow = 'unset');
    }, [show]);

    const navStyle = styles.mobileSidebarContainer + (show ? '' : ` ${styles.hidden}`);

    return (
        <>
            <nav className={navStyle}>
                <SidebarContent
                    onItemClick={() => {
                        setShow(false);
                    }}
                />
            </nav>
            <SidebarToggle
                onClick={() => {
                    setShow(!show);
                }}
                open={show}
            />
        </>
    );
}

export { Sidebar, MobileSidebar };
