import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useSpring, animated } from 'react-spring';

import theme from '../../../../utils/theme';

const Panel = styled(animated.div)`
  position: relative;
  padding-left: 20px;
  border-left: 4px solid ${theme.secondaryColor};
  height: fit-content;
  top: ${({ offset }) => `${offset - 30}px`};
`;

const AnnotationPanel = ({ text, offset }) => {
  const spring = useSpring({
    opacity: 1,
    left: 0,
    from: { opacity: 0, left: 50 },
  });
  return (
    <Panel
      data-annotation-panel
      data-testid="annotation-panel"
      offset={offset}
      style={spring}
    >
      {text}
    </Panel>
  );
};

AnnotationPanel.propTypes = {
  text: PropTypes.string.isRequired,
  offset: PropTypes.number,
};

AnnotationPanel.defaultProps = {
  offset: 0,
};

export default AnnotationPanel;
