import React from 'react';
import styled from '@emotion/styled';

const Mark = styled.span`
  color: blue;
  background-color: ${({ selected }) => (selected ? 'yellow' : 'white')};
`;

const AnnotationMark = props => {
  return (
    <Mark data-annotation-mark {...props}>
      {props.children}
    </Mark>
  );
};

export default AnnotationMark;
