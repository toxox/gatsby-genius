import React from 'react';

export default ({ pageContext: { artist } }) => {
  return (
    <div
      style={{
        whiteSpace: 'pre-line',
      }}
    >
      <h2>artists</h2>
      {JSON.stringify(artist, null, 2)}
    </div>
  );
};
