import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { lorem, helpers } from 'faker';
import { matchers } from 'jest-emotion';

import Lyrics from './index';
// import theme from '../../../../utils/theme';

expect.extend(matchers);

// export const AnnotationPropType = PropTypes.shape({
//     id: PropTypes.number,
//     range: PropTypes.string,
//     text: PropTypes.string,
//   });

//   export const TrackPropType = PropTypes.shape({
//     coverArt: ImagePropType,
//     description: PropTypes.string,
//     lyrics: PropTypes.string,
//     slug: PropTypes.string,
//     title: PropTypes.string,
//   });

//   export const ArtistPropType = PropTypes.shape({
//     image: ImagePropType,
//     id: PropTypes.string,
//     name: PropTypes.string,
//     slug: PropTypes.string,
//     tracks: PropTypes.arrayOf(TrackPropType),
//   });

const trackTitle = lorem.words();
const mockTrack = {
  coverArt: null,
  description: lorem.sentence(),
  title: trackTitle,
  slug: helpers.slugify(trackTitle),
};

const annotatedLyric = lorem.sentence();
mockTrack.lyrics = `${lorem.sentences()} ${annotatedLyric} ${lorem.sentences()}`;
mockTrack.annotations = [
  {
    id: 1,
    range: annotatedLyric,
    text: lorem.sentences(),
  },
];

describe('Lyrics component', () => {
  test('displays annotation when mark is clicked', () => {
    const { getByTestId, queryByTestId } = render(<Lyrics track={mockTrack} />);

    const mark = getByTestId('annotation-mark');
    expect(queryByTestId('track-description')).toBeInTheDocument();
    expect(queryByTestId('annotation-panel')).not.toBeInTheDocument();

    fireEvent.click(mark);
    expect(queryByTestId('track-description')).not.toBeInTheDocument();
    expect(queryByTestId('annotation-panel')).toBeInTheDocument();
    expect(queryByTestId('annotation-panel')).toHaveTextContent(
      mockTrack.annotations[0].text
    );

    // click the same mark
    fireEvent.click(mark);
    expect(queryByTestId('annotation-panel')).toBeInTheDocument();
  });

  test('hides annotation when ESC key is pressed', () => {
    const { getByTestId, queryByTestId } = render(<Lyrics track={mockTrack} />);

    const mark = getByTestId('annotation-mark');
    fireEvent.click(mark);
    expect(queryByTestId('annotation-panel')).toBeInTheDocument();
    fireEvent.keyDown(mark, { key: 'Escape' });
    expect(queryByTestId('annotation-panel')).not.toBeInTheDocument();
  });
});
