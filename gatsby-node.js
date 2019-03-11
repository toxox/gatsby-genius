const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const {
    data: { allArtists },
  } = await graphql(`
    query {
      allArtists {
        edges {
          node {
            id
            name
            slug
            tracks {
              slug
              title
              description
              lyricsFile
              coverArtFile
              annotations {
                id
                range
                text
              }
            }
          }
        }
      }
    }
  `);

  let pagePromises = [];
  allArtists.edges.forEach(async ({ node: artist }) => {
    pagePromises.push(
      await createPage({
        path: artist.slug,
        component: path.resolve(`./src/templates/artist.js`),
        context: {
          artist,
        },
      })
    );

    artist.tracks.forEach(async track => {
      const {
        data: { lyrics, coverArt },
      } = await graphql(
        `
          query($lyricsPath: String, $coverArtFileName: String) {
            lyrics: markdownRemark(fileAbsolutePath: { eq: $lyricsPath }) {
              rawMarkdownBody
            }

            coverArt: file(relativePath: { eq: $coverArtFileName }) {
              childImageSharp {
                fluid(maxWidth: 220) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
          }
        `,
        {
          lyricsPath: `${__dirname.replace(/\\/g, '/')}/data/lyrics/${
            track.lyricsFile
          }`,
          coverArtFileName: track.coverArtFile,
        }
      );

      pagePromises.push(
        await createPage({
          path: `${artist.slug}/${track.slug}`,
          component: path.resolve(`./src/templates/Track/index.js`),
          context: {
            artist,
            track,
            track: {
              ...track,
              lyrics: lyrics.rawMarkdownBody,
              coverArt: coverArt ? coverArt.childImageSharp.fluid : null,
            },
          },
        })
      );
    });
  });

  await Promise.all([pagePromises]);
};
