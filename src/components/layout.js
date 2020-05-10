/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import Theme from './Theme';
import MainContent from './MainContent';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

import '../styles/Constants.css';
import '../styles/App.css';

const Layout = (props) => {
    console.log(props);
    return (
        <Theme color="orange">
            <Navbar />
            <MainContent>
                <Sidebar />
                {props.children}
            </MainContent>
            <Footer />
        </Theme>
    );
};

export default Layout;
