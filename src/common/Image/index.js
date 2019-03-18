import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { ImagePropType } from '../../utils/customPropTypes';

const Image = ({ src }) => {
  if (src) {
    return (
      <Img
        fluid={src}
        style={{
          maxWidth: '220px',
          outline: '0.15rem solid #9a9a9a',
        }}
      />
    );
  }

  return (
    <StaticQuery
      query={graphql`
        query {
          defaultCoverArt: file(
            relativePath: { eq: "default-cover-image.png" }
          ) {
            childImageSharp {
              fluid(maxWidth: 220, quality: 90) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
      render={data => (
        <Img
          fluid={data.defaultCoverArt.childImageSharp.fluid}
          style={{
            maxWidth: '220px',
            outline: '0.15rem solid #9a9a9a',
          }}
        />
      )}
    />
  );
};

Image.propTypes = {
  src: ImagePropType,
};

Image.defaultProps = {
  src: null,
};

export default Image;
