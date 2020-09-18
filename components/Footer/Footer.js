import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Container,
  Box,
  Typography,
  Link,
  Grid,
  useTheme,
  Divider
} from '@material-ui/core';
import {
  Phone as PhoneIcon,
  PhoneIphone as PhoneIphoneIcon,
  MailOutline as MailOutlineIcon,
  MapOutlined as MapOutlinedIcon
} from '@material-ui/icons';

import { withTranslation } from '../../i18n';
import useStyles from './footer-style';

const news = [
  {
    _id: 1,
    description: 'Launched – ZandMedicine Medical product marketplace',
    link: 'https://zandcell.com/launched-zandcell-medical-product-marketplace/',
    date: '2020-08-17',
  },
  {
    _id: 2,
    description: 'ZandMedicine besvarar kritiken från Läkemedelsverket',
    link: 'https://zandcell.com/zandcell-besvarar-kritiken-fran-lakemedelsverket/',
    date: '2020-03-25',
  },
  {
    _id: 3,
    description: 'ZandMedicine Announces Availability of Coronavirus Rapid Diagnostic Test Kit',
    link: 'https://zandcell.com/zandcell-announces-availability-of-coronavirus-rapid-diagnostic-test-kit/',
    date: '2020-03-20',
  }
];

const security = [
  {
    _id: 1,
    description: 'Privacy Policy',
    link: 'https://zandcell.com/privacy-policy/',
  },
  {
    _id: 2,
    description: 'Terms of Use',
    link: 'https://zandcell.com/terms-of-use/',
  },
  {
    _id: 3,
    description: 'Social impact',
    link: 'https://zandcell.com/social-impact/',
  }
];

function Footer(props) {
  const theme = useTheme();
  const classes = useStyles();
  const { invert } = props;
  const colors = {
    titleColor: invert ? 'black' : 'white',
    content: invert ? 'grey' : '#bbdefb',
    date: invert ? 'lightgrey' : '#99bcd9',
    borderColor: invert ? '1px solid lightgrey' : '1px solid rgb(125, 196, 255)',
  };

  return (
    <Container fixed component="footer">
      <div className={clsx(classes.footer, invert && classes.invert)}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={3}>
            <Box style={{ borderRight: colors.borderColor }} p={3} pt={0}>
              <Typography color="textPrimary" className={classes.footerDesc} gutterBottom variant="subtitle1" style={{ color: colors.titleColor, fontSize: theme.spacing(2.5) }}>
                About us
              </Typography>
              <Typography color="textPrimary" className={classes.footerDesc} gutterBottom variant="subtitle2" style={{ color: colors.content }}>
                ZandMedicine is a biotechnology company pioneering the advancements and therapeutic applications of Stem Cell Therapy. Our Technology is called “Regenerate”.
              </Typography>
              <Link href="https://secure.sitelock.com/public/verify/zandcell.com" target="_blank">
                <img src="https://shield.sitelock.com/shield/zandcell.com" alt="SiteLock" />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box p={3} pt={0} style={{ borderRight: colors.borderColor }}>
              <Typography color="textPrimary" className={classes.footerDesc} gutterBottom variant="subtitle1" style={{ color: colors.titleColor, fontSize: theme.spacing(2.5) }}>
                Contact us
              </Typography>
              <Typography color="textPrimary" className={classes.footerDesc} gutterBottom variant="subtitle2" style={{ color: colors.content }}>
                <PhoneIcon style={{ fontSize: 14, marginBottom: -2 }} />
                {' '}
                +1-702-425-9049
                <br />
                <PhoneIphoneIcon style={{ fontSize: 14, marginBottom: -2 }} />
                {' '}
                +46-736-779970
                <br />
                <MailOutlineIcon style={{ fontSize: 14, marginBottom: -2 }} />
                {' '}
                <Link href="mailto:info@zandcell.com" target="_blank" style={{ color: colors.content }} variant="inherit">info@zandcell.com</Link>
                <br />
                <MapOutlinedIcon style={{ fontSize: 14, marginBottom: -2 }} />
                {' '}
                <Link href="https://zandcell.com/contact-us/" target="_blank" style={{ color: colors.content }} variant="inherit">Find us on map</Link>
              </Typography>
              <Link href="https://secure.trust-provider.com/ttb_searcher/trustlogo?v_querytype=W&v_shortname=SECDV&v_search=https://zandcell.com/&x=6&y=5" target="_blank">
                <img
                  src="https://sectigo.com/images/seals/sectigo_trust_seal_lg_2x.png"
                  alt="SiteLock"
                  style={{
                    width: '100%', height: '100%', maxWidth: 280, maxHeight: 108
                  }}
                />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box p={3} pt={0} style={{ borderRight: colors.borderColor }}>
              <Typography color="textPrimary" className={classes.footerDesc} gutterBottom variant="subtitle1" style={{ color: colors.titleColor, fontSize: theme.spacing(2.5) }}>
                Latest News
              </Typography>
              {news.map((item) => (
                <Typography color="textPrimary" className={classes.footerDesc} gutterBottom variant="subtitle2" style={{ color: colors.content }} key={item._id}>
                  <Link href={item.link} target="_blank" style={{ color: colors.content }} variant="inherit">{item.description}</Link>
                  <br />
                  <small style={{ color: colors.date }}>{item.date}</small>
                </Typography>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box pl={3}>
              <img src="https://www.paypal.com/en_US/i/icon/verification_seal.gif" alt="SiteLock" style={{ width: 100, height: 100 }} />
              <br />
              <br />
              <br />
              <Link target="_blank" href="https://secure.trust-provider.com/ttb_searcher/trustlogo?v_querytype=W&v_shortname=POSDV&v_search=https://zandcell.com/&x=6&y=5">
                <img src="https://www.positivessl.com/images/seals/positivessl_trust_seal_lg_222x54.png" alt="SiteLock" style={{ width: 222, height: 54 }} />
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={0}>
          <Box p={3} pb={0}>
            <Typography color="textPrimary" className={classes.footerSecurity} gutterBottom variant="subtitle2" style={{ color: colors.content, paddingRight: 20 }}>
            @ 2020 ZandMedicine. All Rights Reserved.
            </Typography>
            {security.map((item) => (
              <Typography color="textPrimary" className={classes.footerSecurity} gutterBottom variant="subtitle2" style={{ color: colors.content }} key={item._id}>
                <Link
                  href={item.link}
                  target="_blank"
                  style={{
                    color: colors.content, textDecoration: 'underline', borderLeft: '1px solid lightgrey', padding: '0px 20px'
                  }}
                  variant="inherit"
                >
                  {item.description}
                </Link>
              </Typography>
            ))}
          </Box>
        </Grid>
      </div>
    </Container>
  );
}

Footer.propTypes = {
  invert: PropTypes.bool
};

Footer.defaultProps = {
  invert: false
};

export default withTranslation(['crypto-landing'])(Footer);
