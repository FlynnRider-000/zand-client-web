import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import Notification from '../components/Notification';
import brand from '../static/text/brand';
import { withTranslation } from '../i18n';

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

function BlankPage() {
  const classes = useStyles();
  const [message] = useState('Checking for Update...');
  const [percent] = useState(-1);

  useEffect(() => {
  }, []);


  return (
    <React.Fragment>
      <Head>
        <title>
          { brand.crypto.name }
        </title>
      </Head>
      <CssBaseline />
      <div className={classes.mainWrap}>
        <main className={classes.containerWrap}>
          <section className={clsx(classes.spaceTop, classes.spaceBottom)}>
            <Typography variant="h6" align="center">
              {message}
            </Typography>
            <LinearProgress variant="determinate" value={percent} />
          </section>
        </main>
        <Notification />
      </div>
    </React.Fragment>
  );
}

BlankPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(BlankPage);
