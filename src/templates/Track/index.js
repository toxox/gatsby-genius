import React, { useState, useEffect } from 'react';
import reactStringReplace from 'react-string-replace';
import styled from '@emotion/styled';

import Layout from '../../components/layout';
import AnnotationMark from './components/AnnotationMark';
import AnnotationPanel from './components/AnnotationPanel';

const TrackContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export default ({ pageContext: { artist, track } }) => {
  const [annotation, setAnnotation] = useState({ id: null, offset: 0 });

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });

  const { lyrics, title, annotations } = track;

  let annotatedLyrics = lyrics;
  annotations.forEach(({ range, id }) => {
    annotatedLyrics = reactStringReplace(annotatedLyrics, range, (match, i) => {
      return (
        <AnnotationMark
          key={match + i}
          selected={annotation.id === id}
          onClick={e => {
            if (annotation.id === id) return;
            setAnnotation({ id: id, offset: e.nativeEvent.offsetY });
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
         
        <header>
          <h2>
            <a href="test">
              {title} by {artist.name}
            </a>
          </h2>
        </header>
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
