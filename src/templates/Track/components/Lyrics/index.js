import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import reactStringReplace from 'react-string-replace';

import AnnotationPanel from '../AnnotationPanel';
import AnnotationMark from '../AnnotationMark';
import { TrackPropType } from '../../../../utils/customPropTypes';

const TrackContainer = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Lyrics = ({ track }) => {
  const [annotation, setAnnotation] = useState({ id: null, offset: 0 });

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyPress);
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

  const handleKeyPress = e => {
    if (e.key === 'Escape') {
      setAnnotation({ id: null, offset: 0 });
    }
  };

  return (
    <TrackContainer>
      <div data-testid="outside-click-target">{annotatedLyrics}</div>
      {annotation.id ? (
        <div>
          <AnnotationPanel
            text={annotations.find(({ id }) => id === annotation.id).text}
            offset={annotation.offset}
          />
        </div>
      ) : (
        <div data-testid="track-description">{track.description}</div>
      )}
    </TrackContainer>
  );
};

Lyrics.propTypes = {
  track: TrackPropType.isRequired,
};

export default Lyrics;
