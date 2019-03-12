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
            image {
              src {
                childImageSharp {
                  fluid(maxWidth: 220, quality: 90) {
                    base64
                    aspectRatio
                    src
                    srcSet
                    sizes
                  }
                }
              }
            }
            tracks {
              slug
              title
              description
              lyricsFile
              image {
                src {
                  childImageSharp {
                    fluid(maxWidth: 220, quality: 90) {
                      base64
                      aspectRatio
                      src
                      srcSet
                      sizes
                    }
                  }
                }
              }
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
        component: path.resolve(`./src/templates/Artist/index.js`),
        context: {
          artist,
        },
      })
    );

    artist.tracks.forEach(async track => {
      const {
        data: { lyrics },
      } = await graphql(
        `
          query($lyricsPath: String) {
            lyrics: markdownRemark(fileAbsolutePath: { eq: $lyricsPath }) {
              rawMarkdownBody
            }
          }
        `,
        {
          lyricsPath: `${__dirname.replace(/\\/g, '/')}/data/lyrics/${
            track.lyricsFile
          }`,
        }
      );

      pagePromises.push(
        await createPage({
          path: `${artist.slug}/${track.slug}`,
          component: path.resolve(`./src/templates/Track/index.js`),
          context: {
            artist,
            track: {
              ...track,
              lyrics: lyrics.rawMarkdownBody,
              coverArt: track.image
                ? track.image.src.childImageSharp.fluid
                : null,
            },
          },
        })
      );
    });
  });

  await Promise.all([pagePromises]);
};
