import React from 'react';
import PropTypes from 'prop-types';
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

const AnnotationMark = ({ children, onClick, selected }) => {
  return (
    <Mark
      data-annotation-mark
      data-testid="annotation-mark"
      onClick={onClick}
      selected={selected}
    >
      {children}
    </Mark>
  );
};

AnnotationMark.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};

AnnotationMark.defaultProps = {
  onClick: () => {},
  selected: false,
};

export default AnnotationMark;
