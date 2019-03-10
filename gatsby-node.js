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
        data: { markdownRemark },
      } = await graphql(
        `
          query($pathName: String) {
            markdownRemark(fileAbsolutePath: { eq: $pathName }) {
              rawMarkdownBody
            }
          }
        `,
        {
          pathName: `${__dirname.replace(/\\/g, '/')}/data/lyrics/${
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
            track,
            track: {
              ...track,
              lyrics: markdownRemark.rawMarkdownBody,
            },
          },
        })
      );
    });
  });

  await Promise.all([pagePromises]);
};
