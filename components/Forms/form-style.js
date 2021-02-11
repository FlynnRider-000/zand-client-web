import { makeStyles } from '@material-ui/core/styles';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';

const contactStyles = makeStyles(theme => ({
  title: {},
  pageWrap: {
    padding: theme.spacing(11, 5),
    position: 'relative',
    textAlign: 'center',
    overflow: 'hidden',
    background: theme.palette.background.default,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(11, 0),
    },
    '& $title': {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
      [theme.breakpoints.down('xs')]: {
        fontSize: 32
      }
    },
    '& a': {
      color: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
      textTransform: 'none',
      fontSize: 16,
      textDecoration: 'none',
      fontWeight: theme.typography.fontWeightRegular
    }
  },
  addRequestBtn: {
    padding: '5px 10px',
    margin: '0px 20px'
  },
  hotproducts: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  featuredproducts: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  captchaArea: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDriection: 'row',
    justifyContent: 'center'
  },
  pageWrap1: {
    padding: theme.spacing(5, 1),
    position: 'relative',
    textAlign: 'center',
    overflow: 'hidden',
    // background: 'linear-gradient(-45deg, #137CC3, #1879C2);',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 0),
    },
    '& $title': {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
      [theme.breakpoints.down('xs')]: {
        fontSize: 32
      }
    },
    '& a': {
      color: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
      textTransform: 'none',
      fontSize: 16,
      textDecoration: 'none',
      fontWeight: theme.typography.fontWeightRegular
    }
  },
  frmDeco: {},
  innerWrap: {
    textAlign: 'left',
    marginTop: 20
  },
  fullFromWrap: {
    background: theme.palette.background.paper,
    padding: theme.spacing(9, 0),
  },
  documentViewWrap: {
    background: theme.palette.background.paper,
    padding: theme.spacing(9, 1),
    paddingTop: theme.spacing(11),
  },
  fullFromWrap1: {
    padding: theme.spacing(9, 0, 0, 0),
  },
  formBox: {
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    background: theme.palette.type === 'dark' ? darken(theme.palette.primary.dark, 0.4) : theme.palette.primary.light,
    boxShadow: '0 0 12px 2px rgba(0, 0, 0, 0.05)',
  },
  select: {
    width: '100%'
  },
  desc: {
    fontSize: 20,
    textAlign: 'center',
    padding: theme.spacing(0, 12),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 5)
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 2),
      fontSize: 16
    }
  },
  light: {},
  inputService: {
    width: '100%',
    margin: '10px 0px !important',
    '& label': {
      left: theme.spacing(0.5),
    },
    '& > div': {
      overflow: 'hidden',
      '& input, textarea': {
        paddingLeft: theme.spacing(2),
      }
    },
    '&$light': {
      '& label': {
        color: theme.palette.common.white,
      },
      '& > div': {
        border: `1px solid ${fade(theme.palette.primary.light, 0.5)}`,
        '& input': {
          color: theme.palette.common.white,
        },
      }
    }
  },
  input: {
    width: '100%',
    '& label': {
      left: theme.spacing(0.5),
    },
    '& > div': {
      overflow: 'hidden',
      background: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#eeeeee',
      '&:hover': {
        background: darken(theme.palette.background.paper, 0.1)
      },
      '& input, textarea': {
        paddingLeft: theme.spacing(2),
        '&:focus': {
          background: theme.palette.background.default
        },
      }
    },
    '&$light': {
      '& label': {
        color: theme.palette.common.white,
      },
      '& > div': {
        border: `1px solid ${fade(theme.palette.primary.light, 0.5)}`,
        '& input': {
          color: theme.palette.common.white,
          '&:focus': {
            background: fade(theme.palette.text.hint, 0.2)
          },
          '&:hover': {
            background: fade(theme.palette.text.hint, 0.2)
          }
        },
      }
    }
  },
  form: {
    textAlign: 'left',
    position: 'relative',
    padding: theme.spacing(0, 15, 10),
    marginTop: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 6, 10),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 2, 10),
    },
  },
  formHelper: {
    display: 'flex',
    marginTop: theme.spacing(),
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center'
    },
  },
  flex: {},
  btnCenterAlign: {
    justifyContent: 'center !important'
  },
  btnArea: {
    marginTop: theme.spacing(5),
    '& button': {
      marginTop: theme.spacing(2)
    },
    '& span': {
      [theme.breakpoints.down('xs')]: {
        fontSize: 14
      },
      '& a': {
        textDecoration: 'none !important',
        color: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
      }
    },
    '&$flex': {
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        display: 'block'
      }
    },
  },
  rightIcon: {
    marginLeft: theme.spacing()
  },
  invert: {},
  backtohome: {
    width: 80,
    height: 80,
    position: 'absolute',
    marginTop: 20,
    marginLeft: 20,
    zIndex: 20,
    '&$invert': {
      '& i': {
        color: theme.palette.text.secondary
      }
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    '& i': {
      fontSize: 32,
      color: theme.palette.common.white
    },
    '& > span i:first-child': {
      opacity: 1,
      transition: 'opacity 0.3s ease'
    },
    '& > span i:last-child': {
      position: 'absolute',
      right: 0,
      opacity: 0,
      transition: 'all 0.3s ease'
    },
    '&:hover': {
      '& > span i:first-child': {
        opacity: 0,
      },
      '& > span i:last-child': {
        right: 30,
        opacity: 1,
      },
    }
  },
  check: {
    '& svg': {
      fill: theme.palette.primary.main
    }
  },
  authFrame: {
    display: 'block',
    position: 'relative',
  },
  greeting: {
    padding: theme.spacing(15, 6),
    height: '100%',
    '& h4': {
      color: theme.palette.common.white,
      fontWeight: theme.typography.fontWeightBold,
    },
    '& h6': {
      color: theme.palette.common.white,
      fontWeight: theme.typography.fontWeightMedium,
    }
  },
  logoHeader: {},
  logo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(5),
    '&$logoHeader': {
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10
    },
    '& img': {
      width: 64
    },
    '& p, span': {
      display: 'block',
      textTransform: 'uppercase',
      fontSize: 24,
      paddingBottom: 4,
      color: theme.palette.common.white,
      fontWeight: theme.typography.fontWeightBold
    }
  },
  head: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
      justifyContent: 'center',
      '& a': {
        display: 'none'
      }
    }
  },
  signArrow: {},
  formWrap: {
    minHeight: 600,
    background: theme.palette.background.paper,
    position: 'relative',
    paddingBottom: theme.spacing(10),
    overflow: 'hidden',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5)
    },
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(8)
    },
    '& $frmDeco': {
      left: '58.333333%',
      transform: 'translateX(-72%)',
      bottom: '-75px'
    },
  },
  socmedSideLogin: {
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      display: 'block'
    },
    '& > *': {
      color: theme.palette.common.white,
      width: 160,
      padding: theme.spacing(),
      [theme.breakpoints.down('md')]: {
        margin: theme.spacing(0, 0.5)
      },
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(2),
        width: '100%',
      }
    },
    '& i': {
      color: theme.palette.common.white,
      marginRight: theme.spacing()
    }
  },
  blueBtn: {
    background: '#28aae1',
    '&:hover': {
      background: darken('#28aae1', 0.2),
    }
  },
  naviBtn: {
    background: '#3b579d',
    '&:hover': {
      background: darken('#3b579d', 0.2),
    }
  },
  redBtn: {
    background: '#dd493c',
    '&:hover': {
      background: darken('#dd493c', 0.2),
    }
  },
  separator: {
    margin: `${theme.spacing(5)}px auto`,
    maxWidth: 340,
    minWidth: 256,
    textAlign: 'center',
    position: 'relative',
    '& p': {
      [theme.breakpoints.down('xs')]: {
        fontSize: 12
      },
    },
    '&:before, &:after': {
      content: '""',
      borderTop: `1px solid ${theme.palette.text.hint}`,
      top: '50%',
      position: 'absolute',
      width: '20%'
    },
    '&:before': {
      left: 0,
    },
    '&:after': {
      right: 0,
    }
  },
  lower: {},
  deco: {
    width: '100%',
    height: '150%',
    position: 'absolute',
    overflow: 'hidden',
    left: 0,
    top: -300,
    transform: 'scale(1.1)',
    transformOrigin: 'center',
    [theme.breakpoints.down('xs')]: {
      '& svg': {
        left: '-150%',
        position: 'relative',
      }
    },
    '&$lower': {
      top: -150,
    },
  },
  parallax: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    overflow: 'hidden',
    left: 0,
    top: 0,
  },
  parallaxLeft: {
    '& > div': {
      top: -1500,
    }
  },
  parallaxRight: {
    '& > div': {
      top: -400,
    }
  },
  decoInner: {
    width: '100%',
    height: '150%',
    position: 'absolute',
    overflow: 'hidden',
    left: -114,
    top: -300,
    transform: 'scale(1.1)',
    transformOrigin: 'center',
    '& $deco': {
      [theme.breakpoints.up(1281)]: {
        left: 50
      },
    }
  },
  decoSm: {
    textAlign: 'center',
    marginTop: theme.spacing(10)
  },
  tableRoot: {
    width: '98%',
    margin: 'auto'
  },
  tabContainer: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  fileList: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  listBorder: {
    width: 200
  },
  requestStatusSelect: {
    minWidth: '80px !important',
    maxWidth: '150px !important',
    padding: '4px !important',
    marginLeft: '20px !important',
    marginRight: '20px !important',
  },
  leftIcon: {
    flexDirection: 'row',
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    justifyContent: 'center',
  },
  link: {
    '&:hover': {
      textDecoration: 'underline !important',
    }
  },
  requestDetails: {
    padding: '0px 20px'
  },
  attachedFile: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  attachedInput: {
    display: 'none',
  },
  scrollable: {
    paddingLeft: 30,
    overflowX: 'auto',
    width: '100%',
    display: '-webkit-inline-box',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    '&::-webkit-scrollbar': {
      width: '0.6em',
      height: '0.6em',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.9)',
      backgroundColor: 'white',
      borderRadius: 10,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#157AC2',
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.9)',
      borderRadius: 10,
      outline: '1px solid slategrey',
    }
  },
  requestDivider: {
    [theme.breakpoints.up('lg')]: {
      paddingRight: theme.spacing(2),
      borderRight: '1px solid lightgrey',
    },
    [theme.breakpoints.down('md')]: {
      borderBottom: '1px solid lightgrey',
    },
  },
}));

export default contactStyles;
