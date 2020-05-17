/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import PageElement from './gatsby/wrapPageElement';
import RootElement from './gatsby/wrapRootElement';

export const wrapPageElement = PageElement;

export const wrapRootElement = RootElement;
