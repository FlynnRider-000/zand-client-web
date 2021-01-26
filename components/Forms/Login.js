/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useDispatch, useSelector } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';
import * as Actions from '../../store/actions/main';
import { withTranslation } from '../../i18n';
import { useText } from '../../theme/common';
import Title from '../Title/TitleSecondary';
import AuthFrame from './AuthFrame';
import useStyles from './form-style';

function Login(props) {
  let tokenExistOnOpened = 0;
  const router = useRouter();
  const dispatch = useDispatch();
  const classes = useStyles();
  const text = useText();
  const { t } = props;
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const captchaKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

  const accessToken = useSelector(state => state.main.authReducer.access_token);
  const apiIsBusy = useSelector(state => state.main.apiReducer.isBusy);

  const reCaptchaRef = useRef();

  const onSignSuccess = () => {
    router.push('/');
  };

  useEffect(() => {
    const storageAccessToken = localStorage.getItem('access_token');
    if (storageAccessToken !== undefined && storageAccessToken !== '') {
      // console.log(storageAccessToken);
      if (!apiIsBusy) {
        tokenExistOnOpened = 1;
        dispatch(Actions.signInWithToken(storageAccessToken));
      }
    }
  }, []);

  useEffect(() => {
    if (tokenExistOnOpened === 1) {
      tokenExistOnOpened = 0;
      return;
    }
    // console.log(accessToken);
    if (accessToken !== '') {
      onSignSuccess();
    }
  }, [accessToken]);

  const [check, setCheck] = useState(false);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheck = event => {
    setCheck(event.target.checked);
  };

  const handleSubmit = () => {
    // console.log('data submited');
    dispatch(Actions.signIn({
      email: values.email,
      password: values.password
    }));
  };

  const handleCaptchaChange = (value) => {
    // console.log('Captcha value:', value);
    if (value !== null) {
      // console.log('data submited');
      setShowCaptcha(false);
      dispatch(Actions.signIn({
        email: values.email,
        password: values.password
      }));
    }
  };

  const asyncScriptOnLoad = () => {
    // console.log('scriptLoad - reCaptcha Ref-', reCaptchaRef);
  };

  return (
    <AuthFrame title={t('common:login_title')} subtitle={t('common:login_subtitle')}>
      <div>
        <div className={classes.head}>
          <Title align="left">
            {t('common:login')}
          </Title>
          <Button size="small" className={classes.buttonLink} onClick={() => router.push('/register')}>
            <Icon className={clsx(classes.icon, classes.signArrow)}>arrow_forward</Icon>
            {t('common:login_create')}
          </Button>
        </div>
        <ValidatorForm
          onError={errors => // console.log(errors)}
          onSubmit={() => { // console.log('abcde'); }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextValidator
                variant="filled"
                className={classes.input}
                label={t('common:login_email')}
                onChange={handleChange('email')}
                name="email"
                value={values.email}
                errorMessages={['This field is required', 'Email is not valid']}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="filled"
                type="password"
                className={classes.input}
                label={t('common:login_password')}
                onChange={handleChange('password')}
                errorMessages={['This field is required']}
                name="password"
                value={values.password}
              />
            </Grid>
          </Grid>
          <div className={classes.formHelper}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={check}
                  onChange={(e) => handleCheck(e)}
                  color="secondary"
                  value={check}
                  className={classes.check}
                />
              )}
              label={(
                <span className={text.caption}>
                  {t('common:login_remember')}
                </span>
              )}
            />
            <Button size="small" className={classes.buttonLink} href="#">
              {t('common:login_forgot')}
            </Button>
          </div>
          <div className={classes.btnArea}>
            <Button variant="contained" fullWidth type="submit" onClick={handleSubmit} color="secondary" size="large">
              {t('common:continue')}
            </Button>
          </div>
          {
            showCaptcha && (
              <div className={classes.captchaArea}>
                <ReCAPTCHA
                  style={{ display: 'inline-block' }}
                  theme="dark"
                  ref={reCaptchaRef}
                  sitekey={captchaKey}
                  onChange={handleCaptchaChange}
                  asyncScriptOnLoad={asyncScriptOnLoad}
                />
              </div>
            )
          }
        </ValidatorForm>
      </div>
    </AuthFrame>
  );
}


Login.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['crypto-landing', 'common'])(Login);
