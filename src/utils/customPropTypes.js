import PropTypes from 'prop-types';

export const ImagePropType = PropTypes.shape({
  base64: PropTypes.string,
  aspectRatio: PropTypes.number,
  sizes: PropTypes.string,
  src: PropTypes.string,
  srcSet: PropTypes.string,
});

export const AnnotationPropType = PropTypes.shape({
  id: PropTypes.number,
  range: PropTypes.string,
  text: PropTypes.string,
});

export const TrackPropType = PropTypes.shape({
  coverArt: ImagePropType,
  description: PropTypes.string,
  lyrics: PropTypes.string,
  slug: PropTypes.string,
  title: PropTypes.string,
  annotations: PropTypes.arrayOf(AnnotationPropType),
});

export const ArtistPropType = PropTypes.shape({
  image: ImagePropType,
  id: PropTypes.string,
  name: PropTypes.string,
  slug: PropTypes.string,
  tracks: PropTypes.arrayOf(TrackPropType),
});
