import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useCycle, SVGMotionProps } from 'framer-motion';

import styles from '../../styles/Sidebar.module.css';
import SidebarContent from './SidebarContent';

const FixedToggle = styled(motion.button)`
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 200;
    width: 70px;
    height: 70px;
    background-color: var(--alt-background-color);
    color: var(--primary-color);
    fill: var(--primary-color);
    border: none;
    border-radius: 35px;
`;

const Path = (props: SVGMotionProps<SVGPathElement>) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <motion.path fill="#3F6078" strokeWidth="3" stroke="var(--primary-color)" strokeLinecap="round" {...props} />
);

interface SidebarToggleProps {
    toggle: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
}

export const MenuToggle = ({ toggle }: SidebarToggleProps) => (
    <FixedToggle onClick={toggle} whileTap={{ scale: 0.9 }}>
        <svg width="23" height="23" viewBox="0 -3 23 23">
            <Path
                variants={{
                    closed: { d: 'M 2 2.5 L 20 2.5' },
                    open: { d: 'M 3 16.5 L 17 2.5' },
                }}
            />
            <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                }}
                transition={{ duration: 0.1 }}
            />
            <Path
                variants={{
                    closed: { d: 'M 2 16.346 L 20 16.346' },
                    open: { d: 'M 3 2.5 L 17 16.346' },
                }}
            />
        </svg>
    </FixedToggle>
);

const MobileSidebarBackground = styled(motion.div)`
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    top: 0;
    background: var(--background-color);
    z-index: 140;
`;

const sidebarVariants = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at calc(100vw - 50px) calc(100vh - 50px))`,
        transition: {
            type: 'spring',
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: 'circle(20px at calc(100vw - 50px) calc(100vh - 50px))',
        transition: {
            duration: 0,
        },
    },
};

function MobileSidebar() {
    const [isOpen, toggleOpen] = useCycle(false, true);

    useEffect(() => {
        isOpen && (document.body.style.overflow = 'hidden');
        !isOpen && (document.body.style.overflow = 'unset');
    }, [isOpen]);

    const navStyle = styles.mobileSidebarContainer + (isOpen ? '' : ` ${styles.hidden}`);

    return (
        <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'}>
            <nav className={navStyle}>
                <SidebarContent
                    onItemClick={() => {
                        toggleOpen();
                    }}
                />
            </nav>
            <MenuToggle
                toggle={() => {
                    toggleOpen();
                }}
            />
            <MobileSidebarBackground variants={sidebarVariants} />
        </motion.nav>
    );
}

export default MobileSidebar;
