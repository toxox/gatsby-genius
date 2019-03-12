import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';

import SEO from '../common/SEO';
import Layout from '../common/Layout';
import Grid from '../common/Grid';
import Card from '../common/Card';

const Container = styled.div`
  padding-top: 1rem;
`;

const IndexPage = () => (
  <Layout>
    <SEO title="Gatsby Genius" keywords={[`gatsby`, `genius`, `lyrics`]} />
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
                      fluid(maxWidth: 220, quality: 90) {
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
          <Container>
            <Grid>
              {artists.edges.map(({ node: artist }) => {
                return (
                  <Card
                    key={artist.id}
                    title={artist.name}
                    url={artist.slug}
                    imageSrc={
                      artist.image
                        ? artist.image.src.childImageSharp.fluid
                        : null
                    }
                  />
                );
              })}
            </Grid>
          </Container>
        );
      }}
    />
  </Layout>
);

export default IndexPage;
