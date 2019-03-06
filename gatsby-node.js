const path = require(`path`);
const { makeSlug } = require('./utils');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const {
    data: { allLyrics },
  } = await graphql(`
    query {
      allLyrics {
        edges {
          node {
            id
            name
            slug
            tracks {
              slug
              lyrics
            }
          }
        }
      }
    }
  `);

  allLyrics.edges.forEach(({ node: artist }) => {
    createPage({
      path: artist.slug,
      component: path.resolve(`./src/templates/artist.js`),
      context: {
        artist,
      },
    });

    artist.tracks.forEach(track => {
      createPage({
        path: `${artist.slug}/${track.slug}`,
        component: path.resolve(`./src/templates/track.js`),
        context: {
          artist,
          track,
        },
      });
    });
  });
};
