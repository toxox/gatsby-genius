import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../../common/Layout';
import SEO from '../../common/SEO';
import PageCover from '../../common/PageCover';
import Grid from '../../common/Grid';
import Card from '../../common/Card';
import { ArtistPropType } from '../../utils/customPropTypes';

const ArtistPageTemplate = ({ pageContext: { artist } }) => {
  return (
    <Layout>
      <SEO title={`${artist.name} Lyrics`} keywords={[artist.name, `lyrics`]} />
      <PageCover image={artist.image} title={artist.name} />
      <Grid>
        {artist.tracks.map(track => {
          return (
            <Card
              key={track.slug}
              title={track.title}
              url={`${artist.slug}/${track.slug}`}
              imageSrc={
                track.image ? track.image.src.childImageSharp.fluid : null
              }
            />
          );
        })}
      </Grid>
    </Layout>
  );
};

ArtistPageTemplate.propTypes = {
  pageContext: PropTypes.shape({
    artist: ArtistPropType,
  }).isRequired,
};

export default ArtistPageTemplate;
