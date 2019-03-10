import React, { useState, useEffect } from 'react';
import reactStringReplace from 'react-string-replace';
import Layout from '../components/layout';

export default ({ pageContext: { artist, track } }) => {
  const [annotationId, setAnnotation] = useState(null);

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
          selected={annotationId === id}
          onClick={() => {
            annotationId !== id && setAnnotation(id);
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
      setAnnotation(null);
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
        <div>{annotatedLyrics}</div>
        {annotationId && (
          <div data-annotation-panel>
            <h2>Annotation</h2>
            {
              annotations.find(annotation => annotation.id === annotationId)
                .text
            }
          </div>
        )}
      </div>
    </Layout>
  );
};

const AnnotationMark = props => {
  return (
    <span
      data-annotation-mark
      style={{
        color: 'blue',
        backgroundColor: props.selected ? 'yellow' : 'white',
      }}
      {...props}
    >
      {props.children}
    </span>
  );
};
