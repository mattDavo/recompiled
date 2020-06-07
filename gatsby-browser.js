/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import PageElement from './gatsby/wrapPageElement';
import RootElement from './gatsby/wrapRootElement';

import Prism from 'prism-react-renderer/prism';
import refractor from 'refractor';
import swiftLang from 'refractor/lang/swift';
import rubyLang from 'refractor/lang/ruby';
import cppLang from 'refractor/lang/cpp';

// More robust way of seeting language instead of cppLang(Prism)
// See: https://github.com/wooorm/refractor/issues/27#issuecomment-609888676
Object.setPrototypeOf(refractor, Prism);
refractor.register(cppLang);
refractor.register(rubyLang);
refractor.register(swiftLang);

export const wrapPageElement = PageElement;

export const wrapRootElement = RootElement;
