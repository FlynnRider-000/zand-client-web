import { makeStyles } from '@material-ui/core/styles';

const parallaxStyles = makeStyles(theme => ({
  parallaxWrap: {
    position: 'relative',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    zIndex: 0,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
  },
  innerParallax: {
    height: '50%',
    width: '100%',
    position: 'static',
    display: 'block',
    '& figure': {
      height: '50%',
      margin: 0,
      width: '100%',
      display: 'block',
      position: 'static',
    },
    '& figure > div': {
      display: 'block',
      position: 'static',
      width: '100%',
      height: '100%',
      '& svg': {
        position: 'static'
      }
    }
  },
  rightTopBack: {
    textAlign: 'right',
    '& svg': {
      right: -240
    }
  },
  rightTopFront: {
    textAlign: 'right',
    '& svg': {
      right: 50
    }
  },
  leftBottomBack: {
    textAlign: 'left',
    '& svg': {
      position: 'relative',
      left: -120
    }
  },
  leftBottomFront: {
    textAlign: 'left',
    '& svg': {
      position: 'relative',
      left: -50
    }
  },
  hexaBack: {
    opacity: theme.palette.type === 'dark' ? 0.12 : 0.03,
    fill: theme.palette.common.black,
    width: 350,
    height: 300
  },
  hexaTop: {},
  hexaWrap: {
    position: 'relative',
    height: 300
  },
}));

export default parallaxStyles;
