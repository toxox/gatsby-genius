import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import { render } from 'react-testing-library';
import AnnotationMark from './index';

describe('Annotation Mark', () => {
  test('has data-annotation-mark attribute for click event handling ', () => {
    const { getByTestId } = render(<AnnotationMark />);
    expect(getByTestId('annotation-mark')).toHaveAttribute(
      'data-annotation-mark'
    );
  });
});
