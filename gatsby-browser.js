/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import PageElement from './gatsby/wrapPageElement';
import RootElement from './gatsby/wrapRootElement';

import Prism from 'prism-react-renderer/prism';
import swiftLang from 'refractor/lang/swift';
import rubyLang from 'refractor/lang/ruby';
swiftLang(Prism);
rubyLang(Prism);

export const wrapPageElement = PageElement;

export const wrapRootElement = RootElement;
