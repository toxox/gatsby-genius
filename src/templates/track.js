import React from 'react';
import { graphql } from 'gatsby';

export default ({ pageContext: { artist, track } }) => {
  return (
    <div
      style={{
        whiteSpace: 'pre-line',
      }}
    >
      <h2>tracks</h2>
      {JSON.stringify(track, null, 2)}
    </div>
  );
};
