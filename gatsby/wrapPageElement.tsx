import React from 'react';
import Layout from '../src/components/Layout';

const wrapPageElement = ({ element, props }: { element: React.ReactNode; props: object }) => {
    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Layout {...props}>{element}</Layout>
    );
};

export default wrapPageElement;
