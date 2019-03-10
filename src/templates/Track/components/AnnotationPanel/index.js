import React from 'react';
import styled from '@emotion/styled';
import { useSpring, animated } from 'react-spring';

const Panel = styled(animated.div)`
  position: relative;
  padding-left: 20px;
  border-left: 4px solid #99a7ee;
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
    <Panel data-annotation-panel offset={offset} style={spring}>
      {text}
    </Panel>
  );
};

export default AnnotationPanel;
