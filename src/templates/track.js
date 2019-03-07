import React, { useState, useEffect } from 'react';
import reactStringReplace from 'react-string-replace';

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
          onClick={() => setAnnotation(id)}
        >
          {range}
        </AnnotationMark>
      );
    });
  });

  const handleClick = e => {
    if (!e.target.dataset.annotation) {
      setAnnotation(null);
    }
  };

  return (
    <div
      style={{
        whiteSpace: 'pre-line',
      }}
    >
      <h2>
        {title} by {artist.name}
      </h2>
      <div>{annotatedLyrics}</div>
      {annotationId && (
        <div>
          <h2>Annotation</h2>
          {annotations.find(annotation => annotation.id === annotationId).text}
        </div>
      )}
    </div>
  );
};

const AnnotationMark = props => {
  return (
    <span
      data-annotation
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
