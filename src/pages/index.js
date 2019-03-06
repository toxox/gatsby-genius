import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>

    {/* <StaticQuery
      query={graphql`
        query {
          allTracksJson {
            edges {
              node {
                lyrics
              }
            }
          }
        }
      `}
      render={({ allTracksJson }) => {
        return (
          <div
            style={{
              whiteSpace: 'pre-line',
            }}
          >
            {allTracksJson.edges.map(({ node }) => {
              return node.lyrics;
              // return node.lyrics.split("\n")
            })}
          </div>
        );
      }}
    /> */}
  </Layout>
);

export default IndexPage;
