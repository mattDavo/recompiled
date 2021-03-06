import styled from 'styled-components';
import { Link } from 'gatsby';

const PostContainer = styled.div`
    box-shadow: 10px 10px 40px -20px black;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.247);
    margin: 20px 0;
    padding: 15px;
    border-radius: 20px;
    background-color: var(--alt-background-color);
    line-height: 1.5em;
`;

const PostHeading = styled.h2`
    margin: 5px 0;

    color: var(--heading-color);
`;

const PostSubHeading = styled.h2`
    color: var(--secondary-text-color);
    margin: 0;
    font-size: 16px;
    font-weight: 300;
`;

const ContainerLink = styled(Link)`
    color: unset;
    text-decoration: unset;

    --heading-color: var(--text-color);
    &:hover,
    &:focus {
        --heading-color: var(--primary-color);
    }
`;

const PostDescription = styled.p``;

export { PostContainer, PostHeading, PostSubHeading, ContainerLink, PostDescription };
