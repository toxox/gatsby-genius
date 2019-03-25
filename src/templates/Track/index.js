import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import SEO from '../../common/SEO';
import PageCover from '../../common/PageCover';
import Lyrics from './components/Lyrics';
import { ArtistPropType, TrackPropType } from '../../utils/customPropTypes';

const TrackPageTemplate = ({ pageContext: { artist, track } }) => {
  return (
    <>
      <div
        style={{
          whiteSpace: 'pre-line',
        }}
      >
        <SEO
          title={`${track.title} by ${artist.name} Lyrics`}
          keywords={[track.title, artist.name, `lyrics`]}
        />
        <PageCover
          image={track.coverArt}
          title={track.title}
          subtitle={<Link to={`/${artist.slug}`}>{artist.name}</Link>}
        />
        <Lyrics track={track} />
      </div>
    </>
  );
};

TrackPageTemplate.propTypes = {
  pageContext: PropTypes.shape({
    artist: ArtistPropType,
    track: TrackPropType,
  }).isRequired,
};

export default TrackPageTemplate;
