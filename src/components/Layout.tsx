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
import { MobileSidebar } from './Sidebar';
import Footer from './Footer';
import MobileContext from './MobileContext';

import '../styles/Constants.css';
import '../styles/Layout.css';

interface WindowWidthProps {
    children: (width: number | null) => React.ReactNode;
}

interface WindowWidthState {
    width: number | null;
}

class WindowWidth extends React.Component<WindowWidthProps, WindowWidthState> {
    constructor(props: WindowWidthProps) {
        super(props);
        this.state = { width: null };
    }

    componentDidMount() {
        this.setState({ width: window.innerWidth });
        window.addEventListener('resize', ({ target }: { target: EventTarget | null }) => {
            if (target instanceof Window) {
                this.setState({ width: target.innerWidth });
            }
        });
    }

    render() {
        return this.props.children(this.state.width);
    }
}

const Layout = (props: { children: React.ReactNode }) => {
    return (
        <Theme color="green">
            <WindowWidth>
                {(width) => {
                    return (
                        <MobileContext.Provider value={width ? width < 800 : false}>
                            <Navbar />
                            <MainContent>
                                <MobileSidebar />
                                {props.children}
                            </MainContent>
                            <Footer />
                        </MobileContext.Provider>
                    );
                }}
            </WindowWidth>
        </Theme>
    );
};

export default Layout;
