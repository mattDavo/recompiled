import path from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import people from '../data/people.json';

const onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;
    // you only want to operate on `Mdx` nodes. If you had content from a
    // remote CMS you could also check to see if the parent node was a
    // `File` node here
    if (node.internal.type === 'Mdx') {
        const value = createFilePath({ node, getNode });
        const { relativePath, sourceInstanceName } = getNode(node.parent);

        createNodeField({
            // Name of the field you are adding
            name: 'slug',
            // Individual MDX node
            node,
            // Generated value based on filepath with "blog" prefix. you
            // don't need a separating "/" before the value because
            // createFilePath returns a path with the leading "/".
            value: `/blog${value}`,
        });

        // Create a path for the file in the repo
        createNodeField({
            node,
            name: 'rootPath',
            value: path.join(sourceInstanceName, relativePath),
        });
    }
};

const createPages = async ({ graphql, actions, reporter }) => {
    // Destructure the createPage function from the actions object
    const { createPage } = actions;
    const result = await graphql(`
        query {
            allMdx {
                edges {
                    node {
                        id
                        frontmatter {
                            slug
                            tags
                            title
                            description
                            published
                            updated
                        }
                    }
                }
            }
        }
    `);
    if (result.errors) {
        reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
    }
    // Create blog post pages.
    const posts = result.data.allMdx.edges;

    const mdxTemplate = path.resolve(`./src/components/DefaultMDX.tsx`);
    const tagTemplate = path.resolve(`./src/components/TagPage.tsx`);

    const tagData = {};

    // you'll call `createPage` for each result
    posts.forEach(({ node }, index) => {
        createPage({
            // This is the slug you created before
            // (or `node.frontmatter.slug`)
            path: node.frontmatter.slug,
            // This component will wrap our MDX content
            component: mdxTemplate,
            // You can use the values in this context in
            // our page layout component
            context: { id: node.id },
        });

        const {
            frontmatter: { tags },
        } = node;

        if (tags) {
            tags.forEach((t) => {
                const tag = t.replace(/\s+/, '-');
                if (!tagData[tag]) {
                    tagData[tag] = { posts: [] };
                }

                tagData[tag].posts.push(node);
            });
        }
    });

    Object.entries(tagData).forEach(([tag, data]) => {
        createPage({
            path: `/tags/${tag}`,
            component: tagTemplate,
            context: { tag: tag, ...data },
        });
    });
};

// Setup custom graphql schema
const createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;
    const typeDefs = `
    type Mdx implements Node {
        frontmatter: Frontmatter
    }
    type Frontmatter {
        title: String!
        slug: String!
        description: String
        published: Int
        updated: Int
        tags: [String]
        links: [String]
        authors: [String]
    }
    
    type Person implements Node {
        name: String!
        username: String!
        contact: ContactDetail
    }
    
    type ContactDetail {
        email: String
        website: String
        twitter: String
        github: String
    }
  `;
    createTypes(typeDefs);
};

const sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
    people.forEach((person) => {
        const node = {
            name: person.name,
            username: person.username,
            contact: person.contact,
            id: createNodeId(person.username),
            internal: {
                type: 'Person',
                contentDigest: createContentDigest(person),
            },
        };
        actions.createNode(node);
    });
};

export { onCreateNode, createPages, createSchemaCustomization, sourceNodes };
