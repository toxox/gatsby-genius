import Typography from 'typography';
import fairyGatesTheme from 'typography-theme-fairy-gates';

fairyGatesTheme.overrideThemeStyles = () => ({
  a: {
    backgroundImage: 'none',
    textShadow: 'none',
  },
});

const typography = new Typography(fairyGatesTheme);

export default typography;
