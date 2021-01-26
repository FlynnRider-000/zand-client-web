/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useDispatch, useSelector } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';
import * as Actions from '../../store/actions/main';
import { withTranslation } from '../../i18n';
import { useText } from '../../theme/common';
import Title from '../Title/TitleSecondary';
import AuthFrame from './AuthFrame';

const useStyles = makeStyles(theme => ({
  maintainWraper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'center',
    }
  },
  maintain: {
    maxWidth: 600,
    padding: 20,
    margin: '30px 0px !important',
    width: '100%'
  },
}));

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
      <Grid container alignItems="center">
        <Grid item xs={12} className={classes.maintainWraper}>
          <img className={classes.maintain} src="/static/images/maintain.png" alt="illustration" />
        </Grid>
        <Grid item xs={12} >
          <h1 style={{"textAlign":'center'}}>
            Website Under Maintenance!
          </h1>
        </Grid>
      </Grid>
      </div>
    </AuthFrame>
  );
}


Login.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['crypto-landing', 'common'])(Login);
