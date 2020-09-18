import React from 'react';

import { useSelector } from 'react-redux';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/Header';
import Banner from '../components/Banner';
import PublicRequest from '../components/Forms/PublicRequest';
import FeaturedRequest from '../components/Forms/FeaturedRequest';
import FooterWithCounter from '../components/Footer/FooterWithCounter';
import brand from '../static/text/brand';
import { withTranslation } from '../i18n';

const sectionMargin = margin => (margin * 20);
const useStyles = makeStyles(theme => ({
  mainWrap: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    background: theme.palette.type === 'dark' ? theme.palette.background.default : theme.palette.background.paper,
  },
  spaceBottom: {
    marginBottom: sectionMargin(theme.spacing()),
    [theme.breakpoints.down('md')]: {
      marginBottom: sectionMargin(6),
    }
  },
  spaceTop: {
    marginTop: sectionMargin(theme.spacing()),
    [theme.breakpoints.down('md')]: {
      marginTop: sectionMargin(6),
    }
  },
  spaceBottomShort: {
    marginBottom: sectionMargin(theme.spacing() / 2),
  },
  spaceTopShort: {
    marginTop: sectionMargin(theme.spacing() / 2),
  },
  containerWrap: {
    marginTop: -40,
    '& > section': {
      position: 'relative'
    }
  }
}));

function Landing() {
  const signInState = useSelector(state => state.main.authReducer.state);
  const classes = useStyles();

  return (
    <React.Fragment>
      <Head>
        <title>
          { brand.crypto.name }
          &nbsp; - Home Page
        </title>
      </Head>
      <div className={classes.mainWrap}>
        <Header />
        <main className={classes.containerWrap}>
          <section id="banner">
            <Banner />
          </section>
          {signInState && (
            <section>
              <PublicRequest />
              <FeaturedRequest />
            </section>
          )}
        </main>
        <FooterWithCounter />
        <script src="/static/scripts/stats.min.js" />
      </div>
    </React.Fragment>
  );
}

Landing.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation(['common', 'crypto-landing'])(Landing);
// export default Landing;
