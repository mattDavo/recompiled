import React from 'react';
import { Link } from 'gatsby';
import { motion } from 'framer-motion';
import { useLocation } from '@reach/router';
import { FaSearch } from 'react-icons/fa';

import styles from '../styles/Navbar.module.css';
import Logo from './Logo';
import MobileContext from './MobileContext';

const SearchBar = () => {
    return (
        <div className={styles.searchBar}>
            <FaSearch className={styles.searchFieldIcon} size="0.8em" />
            <input inputMode="text" className={styles.searchField} placeholder="Search" />
        </div>
    );
};

const NavbarItemLink = ({
    path,
    children,
    external = false,
}: {
    path: string;
    external?: boolean;
    children: React.ReactNode;
}) => {
    const location = useLocation();
    let className = styles.navbarItem;
    if (location.pathname === path) {
        className += ` ${styles.navbarItemSelected}`;
    }

    return (
        <MobileContext.Consumer>
            {(isMobile) => {
                return (
                    <motion.div whileTap={{ scale: isMobile ? 1 : 0.95 }}>
                        {external ? (
                            <a href={path} className={className}>
                                {children}
                            </a>
                        ) : (
                            <Link to={path} className={className}>
                                {children}
                            </Link>
                        )}
                    </motion.div>
                );
            }}
        </MobileContext.Consumer>
    );
};

export default function Navbar() {
    return (
        <header className={styles.navbar}>
            <div className={styles.navbarItems}>
                <Link to="/" className={styles.title}>
                    <Logo height={38} />
                    {' Recompiled'}
                </Link>
            </div>
            <div className={styles.navbarItemsRight}>
                <NavbarItemLink path="/about">About</NavbarItemLink>
                <NavbarItemLink path="https://github.com/mattdavo/recompiled" external>
                    GitHub
                </NavbarItemLink>
                {false && <SearchBar />}
            </div>
        </header>
    );
}
