import React from 'react';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { Link } from 'gatsby';

import theme from '../../../../utils/theme';

const Wrapper = styled.div`
  background: #1e1e1e;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
`;

const Container = styled.div`
  max-width: ${theme.maxWidth}px;
  margin: 0 auto;
  padding: 2.25rem 0 1.5rem 0;
  color: white;
  text-transform: uppercase;
  display: grid;
  grid-template-columns: 240px 1fr;
`;

const TitleContainer = styled.div`
  padding-top: 1rem;
  h2 {
    color: ${theme.primaryColor};
  }
  h3 > a {
    color: ${theme.secondaryColor};
  }
`;

const TrackHeader = ({ coverArt, track, artist }) => {
  return (
    <Wrapper>
      <Container>
        <Img
          fluid={coverArt}
          style={{
            maxWidth: '220px',
            outline: '0.15rem solid #9a9a9a',
          }}
        />
        <TitleContainer>
          <h2>{track.title}</h2>
          <h3>
            <Link to={artist.slug}>{artist.name}</Link>
          </h3>
        </TitleContainer>
      </Container>
    </Wrapper>
  );
};

export default TrackHeader;
