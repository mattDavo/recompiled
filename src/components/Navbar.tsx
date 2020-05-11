import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';

import styles from '../styles/Navbar.module.css';

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

    if (external) {
        return (
            <a href={path} className={className}>
                {children}
            </a>
        );
    }
    return (
        <Link to={path} className={className}>
            {children}
        </Link>
    );
};

export default function Navbar() {
    return (
        <header className={styles.navbar}>
            <div className={styles.navbarItems}>
                <Link to="/" className={styles.title}>
                    <span className={styles.title} role="img" aria-label="rocket">
                        {'🚀 Recompiled[JT]S'}
                    </span>
                </Link>
            </div>
            <div className={styles.navbarItemsRight}>
                <NavbarItemLink path="/about">About</NavbarItemLink>
                <NavbarItemLink path="https://github.com/mattdavo/learn-react-dev" external>
                    GitHub
                </NavbarItemLink>
                <SearchBar />
            </div>
        </header>
    );
}
