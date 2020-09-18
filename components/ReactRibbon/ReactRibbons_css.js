import { makeStyles } from '@material-ui/core/styles';

const ribbonStyles = makeStyles(() => ({
  ribbonContainer: {
    position: 'relative',
    minHeight: 100,
  },
  rightCornerRibbon: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  rightCornerRibbonText: {
    position: 'absolute',
    transform: 'rotate(45deg)',
    fontSize: '0.8em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    top: -8,
    right: -8,
  },
  rightCornerLargeRibbon: {
    position: 'absolute',
    top: -12,
    right: -12,
  },
  rightCornerLargeRibbonText: {
    position: 'absolute',
    transform: 'rotate(45deg)',
    fontSize: '0.9em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    top: -10,
    right: -10,
  },
  leftCornerRibbon: {
    position: 'absolute',
    top: -10,
    left: -10,
  },
  leftCornerRibbonText: {
    position: 'absolute',
    transform: 'rotate(-45deg)',
    fontSize: '0.8em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    top: -8,
    left: -8,
  },
  leftCornerLargeRibbon: {
    position: 'absolute',
    top: -12,
    left: -12,
  },
  leftCornerLargeRibbonText: {
    position: 'absolute',
    transform: 'rotate(-45deg)',
    fontSize: '0.9em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    top: -10,
    left: -10,
  },
  rightRibbon: {
    position: 'absolute',
    top: 0,
    right: -10,
  },
  rightRibbonText: {
    position: 'absolute',
    fontSize: '0.8em',
    top: 12,
    right: 7,
  },
  rightLargeRibbon: {
    position: 'absolute',
    top: 0,
    right: -15,
  },
  rightLargeRibbonText: {
    position: 'absolute',
    fontSize: '0.9em',
    top: 21,
    right: 9,
  },
  leftRibbon: {
    position: 'absolute',
    top: 0,
    left: -10,
  },
  leftRibbonText: {
    position: 'absolute',
    fontSize: '0.8em',
    top: 12,
    left: 7,
  },
  leftLargeRibbon: {
    position: 'absolute',
    top: 0,
    left: -15,
  },
  leftLargeRibbonText: {
    position: 'absolute',
    fontSize: '0.9em',
    top: 21,
    left: 9,
  }
}));

export default ribbonStyles;
