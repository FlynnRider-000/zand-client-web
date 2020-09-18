import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Notification from '../components/Notification';
import Decoration from '../components/Forms/Decoration';
import RegisterServiceProviderForm from '../components/Forms/registerServiceProvider';
import brand from '../static/text/brand';
import { withTranslation } from '../i18n';

const useStyles = makeStyles(theme => ({
  mainWrap: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  innerWrap: {
    width: '100% !important',
    maxWidth: '100% !important',
  },
  spaceAll: {
    paddingLeft: 10,
    '& p': {
      lineHeight: '2em',
      fontSize: '1rem'
    },
    '& li': {
      lineHeight: '1.7em',
      fontSize: '0.9rem'
    }
  },
  getttingStartedContent: {
    padding: theme.spacing(4),
    [theme.breakpoints.up('lg')]: {
      maxWidth: 600,
    },
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'center',
    }
  },
  containerWrap: {
    marginTop: theme.spacing(10),
    padding: theme.spacing(4),
    '& > section': {
      position: 'relative'
    }
  },
  serviceProviderWraper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'center',
    }
  },
  serviceProvider: {
    maxWidth: 600,
    padding: 20,
    margin: '30px 0px !important',
    width: '100%'
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
}));

function BlankPage(props) {
  const classes = useStyles();
  const router = useRouter();
  const { onToggleDark, onToggleDir } = props;
  return (
    <React.Fragment>
      <Head>
        <title>
          { brand.crypto.name }
          &nbsp; - Blank page
        </title>
      </Head>
      <CssBaseline />
      <div className={classes.mainWrap}>
        <Header
          onToggleDark={onToggleDark}
          onToggleDir={onToggleDir}
          invert
        />
        <main className={classes.containerWrap}>
          <div className={classes.pageWrap}>
            <Decoration />
          </div>
          <Container className={classes.innerWrap}>
            <IconButton onClick={() => router.push('/')} className={clsx(classes.backtohome, classes.invert)}>
              <i className="ion-ios-home" />
              <i className="ion-ios-arrow-thin-left" />
            </IconButton>
            <Paper className={clsx(classes.formBox, 'fragment-fadeUp')}>
              <div className={classes.fullFromWrap}>
                <Grid container alignItems="center">
                  <Grid item lg={6} xs={12} className={classes.serviceProviderWraper}>
                    <img className={classes.serviceProvider} src="/static/images/service-provider.png" alt="illustration" />
                  </Grid>
                  <Grid item lg={6} xs={12} className={classes.getttingStartedContent}>
                    <RegisterServiceProviderForm />
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </Container>
        </main>
        <section className={classes.spaceTop}>
          <Footer invert />
        </section>
        <Notification />
      </div>
    </React.Fragment>
  );
}

BlankPage.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};

BlankPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(BlankPage);
