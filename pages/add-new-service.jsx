/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Notification from '../components/Notification';
import brand from '../static/text/brand';
import { withTranslation } from '../i18n';
import NewServiceForm from '../components/Forms/NewService';

const sectionMargin = margin => (margin * 20);
const useStyles = makeStyles(theme => ({
  mainWrap: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  spaceBottom: {
    marginBottom: sectionMargin(theme.spacing())
  },
  spaceTop: {
    paddingTop: sectionMargin(theme.spacing())
  },
  containerWrap: {
    marginTop: theme.spacing(10),
    padding: theme.spacing(4),
    '& > section': {
      position: 'relative'
    }
  },
}));

function AddNewPage(props) {
  const router = useRouter();
  const classes = useStyles();
  const { onToggleDark, onToggleDir } = props;

  useEffect(() => {
    // console.log(router.query);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>
          { brand.crypto.name }
          &nbsp; - Add New Service
        </title>
      </Head>
      <CssBaseline />
      <div className={classes.mainWrap}>
        <Header
          onToggleDark={onToggleDark}
          onToggleDir={onToggleDir}
          invert
        />
        <div>
          <NewServiceForm />
        </div>
        <section>
          <Footer invert />
        </section>
        <Notification />
      </div>
    </React.Fragment>
  );
}

AddNewPage.propTypes = {
};

AddNewPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(AddNewPage);
