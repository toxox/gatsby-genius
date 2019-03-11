import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Card from '../common/Card';
import styled from '@emotion/styled';

const HomeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 220px);
  grid-gap: 1em 4em;
  justify-content: center;
  padding-top: 1rem;
`;

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <StaticQuery
      query={graphql`
        query {
          artists: allArtists(limit: 5) {
            edges {
              node {
                id
                name
                slug
                image {
                  src {
                    childImageSharp {
                      fluid(maxWidth: 220) {
                        base64
                        aspectRatio
                        src
                        srcSet
                        sizes
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={({ artists }) => {
        return (
          <HomeGrid>
            {artists.edges.map(({ node: artist }) => {
              return (
                <Card
                  title={artist.name}
                  url={artist.slug}
                  imageSrc={
                    artist.image ? artist.image.src.childImageSharp.fluid : null
                  }
                />
              );
            })}
          </HomeGrid>
        );
      }}
    />
  </Layout>
);

export default IndexPage;
