import React from 'react';

import Layout from '../../common/Layout';
import PageCover from '../../common/PageCover';
import Grid from '../../common/Grid';
import Card from '../../common/Card';

export default ({ pageContext: { artist } }) => {
  return (
    <Layout>
      <PageCover
        image={artist.image ? artist.image.src.childImageSharp.fluid : null}
        title={artist.name}
      />
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
