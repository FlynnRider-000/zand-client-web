import React from 'react';
import Footer from './Footer';
import useStyles from './footer-style';

function FooterWithDeco() {
  const classes = useStyles();
  return (
    <div className={classes.footerCounter}>
      <Footer />
    </div>
  );
}

FooterWithDeco.propTypes = {
};

export default FooterWithDeco;
