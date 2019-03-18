import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { lorem } from 'faker';
import { matchers } from 'jest-emotion';
import AnnotationMark from './index';
import theme from '../../../../utils/theme';

expect.extend(matchers);
const fakeAnnotation = lorem.paragraph();

const mockClick = jest.fn(() => {});

describe('Annotation Mark', () => {
  test('has data-annotation-mark attribute and text', () => {
    const { getByTestId } = render(
      <AnnotationMark>{fakeAnnotation}</AnnotationMark>
    );

    const annotation = getByTestId('annotation-mark');

    expect(annotation).toHaveAttribute('data-annotation-mark');
    expect(annotation).toHaveTextContent(fakeAnnotation);
  });

  test('becomes selected when clicked', async () => {
    const { getByTestId, rerender } = render(
      <AnnotationMark onClick={mockClick}>{fakeAnnotation}</AnnotationMark>
    );
    const annotation = getByTestId('annotation-mark');

    expect(annotation).not.toHaveStyleRule(
      'background-color',
      theme.primaryColor
    );

    fireEvent.click(annotation);
    expect(mockClick).toBeCalledTimes(1);

    rerender(
      <AnnotationMark onClick={mockClick} selected>
        {fakeAnnotation}
      </AnnotationMark>
    );

    expect(annotation).toHaveStyleRule('background-color', theme.primaryColor);
  });
});
