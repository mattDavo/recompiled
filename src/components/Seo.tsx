/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

function SEO({ description, lang, meta, title }: { description: string; lang: string; meta: []; title: string }) {
    const { site, imageSharp } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                    }
                }

                imageSharp(original: { src: { regex: "/articleSharePreview/" } }) {
                    original {
                        src
                    }
                }
            }
        `,
    );

    const metaDescription = description || site.siteMetadata.description;
    const resTitle = title ? `${title} - ${site.siteMetadata.title}` : site.siteMetadata.title;

    const image = imageSharp.original.src;
    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={resTitle}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata.author,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
                {
                    property: `og:image`,
                    content: image,
                },
                {
                    property: `twitter:image`,
                    content: image,
                },
                {
                    property: `image`,
                    content: image,
                },
            ].concat(meta)}
        />
    );
}

SEO.defaultProps = {
    lang: `en`,
    meta: [],
    description: ``,
    title: undefined,
};

SEO.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
};

export default SEO;
