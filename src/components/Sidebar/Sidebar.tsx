import React from 'react';

import styles from '../../styles/Sidebar.module.css';
import SidebarContent from './SidebarContent';

function Sidebar() {
    return (
        <nav className={styles.sidebarContainer}>
            <SidebarContent />
        </nav>
    );
}

export default Sidebar;
