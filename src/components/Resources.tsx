import React from 'react';

import { HashHeading1, HashHeading2 } from './Common';

import commonStyles from '../styles/Common.module.css';

export default function Resources() {
    return (
        <div className={commonStyles.textContent}>
            <HashHeading1>Resources</HashHeading1>
            <HashHeading2>Setup and Tooling</HashHeading2>
            <ul>
                <li>
                    <a
                        href="https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Setting up a React project with ESLint, Prettier and Typescript
                    </a>
                </li>
            </ul>
        </div>
    );
}
