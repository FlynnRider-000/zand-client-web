/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ReCAPTCHA from 'react-google-recaptcha';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import { useRouter } from 'next/router';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import brand from '../../static/text/brand';
import routeLink from '../../static/text/link';
import { withTranslation } from '../../i18n';
import logo from '../../static/images/zandcell-logo.png';
import { useText } from '../../theme/common';
import Parallax from '../Parallax/Hexagonal';
import Decoration from './Decoration';
import useStyles from './form-style';

function Contact(props) {
  const classes = useStyles();
  const text = useText();
  const { t } = props;
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [openNotif, setNotif] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [check, setCheck] = useState(false);

  const reCaptchaRef = useRef();

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheck = event => {
    setCheck(event.target.checked);
  };

  const handleSubmit = () => {
    // console.log('13244321');
  };

  const handleClose = () => {
    setNotif(false);
  };

  const handleCaptchaChange = (value) => {
    // console.log('Captcha value:', value);
    if (value !== null) {
      // console.log('data submited');
      setShowCaptcha(false);
      setNotif(true);
    }
  };

  const asyncScriptOnLoad = () => {
    // console.log('scriptLoad - reCaptcha Ref-', reCaptchaRef);
  };

  return (
    <div className={classes.pageWrap}>
      <Decoration />
      <div className={clsx(classes.parallax, classes.parallaxLeft)}>
        <Parallax />
      </div>
      <div className={clsx(classes.parallax, classes.parallaxRight)}>
        <Parallax />
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        key="top right"
        open={openNotif}
        autoHideDuration={4000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Message Sent</span>}
      />
      <Hidden mdUp>
        <div className={clsx(classes.logo, classes.logoHeader)}>
          <a href={routeLink.crypto.home}>
            <img src={logo} alt="logo" />
            <Typography component="span" className={text.title}>
              {brand.crypto.projectName}
            </Typography>
          </a>
        </div>
      </Hidden>
      <Container maxWidth="md" className={classes.innerWrap}>
        <IconButton href={routeLink.crypto.home} className={clsx(classes.backtohome, classes.invert)}>
          <i className="ion-ios-home" />
          <i className="ion-ios-arrow-thin-left" />
        </IconButton>
        <Paper className={clsx(classes.formBox, 'fragment-fadeUp')}>
          <div className={classes.fullFromWrap}>
            <Typography
              variant="h3"
              align="center"
              className={clsx(classes.title, text.title)}
              gutterBottom
            >
              {t('common:contact_title2')}
            </Typography>
            <Typography className={clsx(classes.desc, text.subtitle2)}>
              {t('common:contact_subtitle')}
            </Typography>
            <div className={classes.form}>
              <ValidatorForm
                onSubmit={handleSubmit}
              >
                <Grid container spacing={6}>
                  <Grid item md={6} xs={12}>
                    <TextValidator
                      variant="filled"
                      className={classes.input}
                      label={t('common:form_name')}
                      onChange={handleChange('name')}
                      name="Name"
                      value={values.name}
                      validators={['required']}
                      errorMessages={['this field is required']}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextValidator
                      variant="filled"
                      className={classes.input}
                      label={t('common:form_email')}
                      onChange={handleChange('email')}
                      name="Email"
                      value={values.email}
                      validators={['required', 'isEmail']}
                      errorMessages={['this field is required', 'email is not valid']}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextValidator
                      variant="filled"
                      className={classes.input}
                      label={t('common:form_phone')}
                      onChange={handleChange('phone')}
                      name="Phone"
                      value={values.phone}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextValidator
                      variant="filled"
                      className={classes.input}
                      label={t('common:form_company')}
                      onChange={handleChange('company')}
                      name="Company"
                      value={values.company}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextValidator
                      variant="filled"
                      multiline
                      rows="6"
                      className={classes.input}
                      label={t('common:form_message')}
                      onChange={handleChange('message')}
                      name="Message"
                      value={values.message}
                    />
                  </Grid>
                </Grid>
                <div className={clsx(classes.btnArea, classes.flex)}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={check} onChange={(e) => handleCheck(e)} color="primary" value="check" />
                    }
                    label={(
                      <span className={text.caption}>
                        {t('common:form_terms_head')}
                        <a href="https://zandcell.com/terms-of-use/" target="_blank" className={classes.link}>
                          {t('common:form_terms')}
                        </a>
                        {t('common:form_terms_mid')}
                        <a href="https://zandcell.com/privacy-policy/" target="_blank" className={classes.link}>
                          {t('common:form_privacy')}
                        </a>
                        {t('common:form_terms_end')}
                      </span>
                    )}
                  />
                  <Button variant="contained" onClick={() => router.push('/')} fullWidth={isMobile} type="submit" color="secondary" size="large">
                    {t('common:form_send')}
                  </Button>
                </div>
              </ValidatorForm>
              {
                !!showCaptcha && (
                  <div className={classes.captchaArea}>
                    <ReCAPTCHA
                      style={{ display: 'inline-block' }}
                      theme="dark"
                      ref={reCaptchaRef}
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      onChange={handleCaptchaChange}
                      asyncScriptOnLoad={asyncScriptOnLoad}
                    />
                  </div>
                )
              }
            </div>
          </div>
        </Paper>
      </Container>
    </div>
  );
}

Contact.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['common'])(Contact);
