import React from 'react';
import styled from '@emotion/styled';
import theme from '../../../../utils/theme';

const Mark = styled.span`
  background-color: ${({ selected }) =>
    selected ? theme.primaryColor : '#e9e9e9'};
  cursor: pointer;
  &:hover {
    background-color: ${theme.primaryColor};
  }
`;

const AnnotationMark = props => {
  return (
    <Mark data-annotation-mark data-testid="annotation-mark" {...props}>
      {props.children}
    </Mark>
  );
};

export default AnnotationMark;
