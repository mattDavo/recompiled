import React from 'react';

import SEO from '../components/Seo';
import { HashHeading1, ContentContainer } from '../components/Common';

const NotFoundPage = () => (
    <ContentContainer>
        <SEO title="404: Not found" />
        <HashHeading1>{"Hmmm, there isn't anything here 🧐"}</HashHeading1>
        <p>
            If you think there should be something here please{' '}
            <a href="https://github.com/mattDavo/learn-react-dev/issues/new">raise an issue</a>!
        </p>
    </ContentContainer>
);

export default NotFoundPage;
