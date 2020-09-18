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
  getttingStartedImageWraper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'center',
    }
  },
  getttingStartedImage: {
    maxWidth: 600,
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
                  <Grid item lg={6} xs={12} className={classes.getttingStartedImageWraper}>
                    <img className={classes.getttingStartedImage} src="/static/images/getting-stared.gif" alt="illustration" />
                  </Grid>
                  <Grid item lg={6} xs={12} className={classes.getttingStartedContent}>
                    <section className={clsx(classes.spaceAll)}>
                      <p><strong>Business to business marketplace for PPE, tests and other medical products</strong></p>
                      <p>We created this marketplace because we wanted to help professional entities in their fight against COVID-19. We also wanted a safe, secure and accessible marketplace to get rid of all the criminals who are trying to commit fraud against companies in this pandemic.</p>
                      <p><strong>How to use this software</strong></p>
                      <ol>
                        <li>Register on platform.</li>
                        <li>After receiving your application we will send you an NDA form by email. Unless you have signed NDA with us before. Your application will be approved after you have reviewed and signed the NDA online.</li>
                        <li>After approval you can login and view all the listed commodity sell and buy requests. You can also request to list your own sell or buy requests. Each one has their own document requirements and questions. We are here to speed up the buy and sell process and therefore require you to send in documents to speed up and stop fraud attempts. Security has been our highest priority and all documents you send to us will be stored encrypted and only accessed by our attorney.</li>
                        <li>Our job: we will try to match confirmed stocks with confirmed buyers behind the scenes. You can also contact us regarding a listed sell or buy request you find on the marketplace.</li>
                        <li>We charge the buyer 1% and the seller 1% on completed deals. You don&rsquo;t have to pay 10% commission or fees anymore. You also don&rsquo;t have to risk your money, data and reputation doing business with people you don&rsquo;t know. Here on our marketplace, all buyer funds are confirmed before they list a buy request and all seller stocks are confirmed before they list a stock for sale by our attorney. Remember, security is our highest priority.</li>
                      </ol>
                      <p>&nbsp;</p>
                      <p>Thank you for using our trading platform!</p>
                    </section>
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
