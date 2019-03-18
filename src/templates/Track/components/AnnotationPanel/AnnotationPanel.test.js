import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import React from 'react';
import { render } from 'react-testing-library';
import { lorem } from 'faker';
import { matchers } from 'jest-emotion';
import AnnotationPanel from './index';

expect.extend(matchers);
const fakeAnnotation = lorem.paragraph();

describe('Annotation Mark', () => {
  test('has data-annotation-mark attribute and text', () => {
    const { getByTestId } = render(<AnnotationPanel text={fakeAnnotation} />);

    const annotation = getByTestId('annotation-panel');

    expect(annotation).toHaveAttribute('data-annotation-panel');
    expect(annotation).toHaveTextContent(fakeAnnotation);
  });
});
