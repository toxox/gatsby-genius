import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import reactStringReplace from 'react-string-replace';
import styled from '@emotion/styled';

import Layout from '../../common/Layout';
import SEO from '../../common/SEO';
import PageCover from '../../common/PageCover';
import AnnotationMark from './components/AnnotationMark';
import AnnotationPanel from './components/AnnotationPanel';
import { ArtistPropType, TrackPropType } from '../../utils/customPropTypes';

const TrackContainer = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const TrackPageTemplate = ({ pageContext: { artist, track } }) => {
  const [annotation, setAnnotation] = useState({ id: null, offset: 0 });

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });

  const { lyrics, annotations } = track;

  let annotatedLyrics = lyrics;
  annotations.forEach(({ range, id }) => {
    annotatedLyrics = reactStringReplace(annotatedLyrics, range, (match, i) => {
      return (
        <AnnotationMark
          key={match + i}
          selected={annotation.id === id}
          onClick={e => {
            if (annotation.id === id) return;
            setAnnotation({ id, offset: e.nativeEvent.offsetY });
          }}
        >
          {range}
        </AnnotationMark>
      );
    });
  });

  const handleClick = e => {
    const { annotationMark, annotationPanel } = e.target.dataset;
    if (!annotationMark && !annotationPanel) {
      setAnnotation({ id: null, offset: 0 });
    }
  };

  return (
    <Layout>
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
        <TrackContainer>
          <div>{annotatedLyrics}</div>
          {annotation.id ? (
            <AnnotationPanel
              text={annotations.find(({ id }) => id === annotation.id).text}
              offset={annotation.offset}
            />
          ) : (
            <div>{track.description}</div>
          )}
        </TrackContainer>
      </div>
    </Layout>
  );
};

TrackPageTemplate.propTypes = {
  pageContext: PropTypes.shape({
    artist: ArtistPropType,
    track: TrackPropType,
  }).isRequired,
};

export default TrackPageTemplate;
