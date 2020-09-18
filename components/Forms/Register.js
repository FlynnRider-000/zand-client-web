import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Typography from '@material-ui/core/Typography';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { withTranslation } from '../../i18n';
import { useText } from '../../theme/common';
import Title from '../Title/TitleSecondary';
import AuthFrame from './AuthFrame';
import useStyles from './form-style';
import * as Actions from '../../store/actions/main';

function Register(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const text = useText();
  const { t } = props;
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const showNotification = useSelector(state => state.main.notificationReducer.showNotification);
  const notificationContent = useSelector(state => state.main.notificationReducer.notificationContent);

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (showNotification) {
      if (notificationContent === 'Sign up Success, please verify your account and sign in.') {
        setRegisterSuccess(true);
      }
    }
  }, [showNotification]);

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== values.password) {
        return false;
      }
      return true;
    });
  });

  const [check, setCheck] = useState(false);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheck = event => {
    setCheck(event.target.checked);
  };

  const handleSubmit = () => {
    console.log('data submited', values);
    dispatch(Actions.signUp({
      name: values.name,
      email: values.email,
      phone: values.phone,
      password: values.password
    }));
  };

  return (
    <AuthFrame title={t('common:register_title')} subtitle={t('common:register_subtitle')}>
      <div>
        <div className={classes.head}>
          <Title align="left">{t('common:register')}</Title>
          {
            !registerSuccess && (
              <Button size="small" className={classes.buttonLink} onClick={() => router.push('/login')}>
                <Icon className={clsx(classes.icon, classes.signArrow)}>arrow_forward</Icon>
                {t('common:register_already')}
              </Button>
            )
          }
        </div>
        {
          !registerSuccess ? (
            <ValidatorForm onError={errors => console.log(errors)} onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextValidator
                    variant="filled"
                    className={classes.input}
                    label={t('common:register_name')}
                    onChange={handleChange('name')}
                    name="name"
                    value={values.name}
                    validators={['required']}
                    errorMessages={['This field is required']}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextValidator
                    variant="filled"
                    className={classes.input}
                    label={t('common:register_email')}
                    onChange={handleChange('email')}
                    name="email"
                    value={values.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['This field is required', 'Email is not valid']}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextValidator
                    variant="filled"
                    className={classes.input}
                    label={t('common:register_phone')}
                    onChange={handleChange('phone')}
                    name="phone"
                    value={values.phone}
                    validators={['required']}
                    errorMessages={['This field is required']}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextValidator
                    variant="filled"
                    type="password"
                    className={classes.input}
                    label={t('common:register_password')}
                    validators={['required']}
                    onChange={handleChange('password')}
                    errorMessages={['This field is required']}
                    name="password"
                    value={values.password}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextValidator
                    variant="filled"
                    type="password"
                    className={classes.input}
                    label={t('common:register_confirm')}
                    validators={['isPasswordMatch', 'required']}
                    errorMessages={['Password mismatch', 'this field is required']}
                    onChange={handleChange('confirmPassword')}
                    name="confirm"
                    value={values.confirmPassword}
                  />
                </Grid>
              </Grid>
              <div className={classes.btnArea}>
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
                      {t('common:form_terms_head')}
                      <a href="https://zandcell.com/terms-of-use/" className={classes.link}>
                        {t('common:form_terms')}
                      </a>
                      {t('common:form_terms_mid')}
                      <a href="https://zandcell.com/privacy-policy/" className={classes.link}>
                        {t('common:form_privacy')}
                      </a>
                      {t('common:form_terms_end')}
                    </span>
                  )}
                />
                <Button variant="contained" fullWidth type="submit" color="secondary" size="large">
                  {t('common:continue')}
                </Button>
              </div>
            </ValidatorForm>
          ) : (
            <>
              <Grid container alignItems="center" spacing={2} direction="column">
                <Grid container alignItems="center" direction="column" style={{ marginTop: 50 }}>
                  <CheckCircleOutlineIcon style={{ fontSize: 100, color: 'rgba(22, 157, 244, 0.7)' }} />
                  <Typography variant="h6" component="h3">
                    Register Success
                  </Typography>
                </Grid>
                <Grid item direction="column" style={{ marginTop: 30 }}>
                  <Typography variant="body1" component="h3">
                    To activate your account, please check your mail box
                  </Typography>
                  <Typography variant="body1" component="h3">
                    We sent you activation link
                  </Typography>
                </Grid>
                <Grid item style={{ marginTop: 30 }}>
                  <Button onClick={() => router.push('/login')}>
                    <Icon className={clsx(classes.icon, classes.signArrow)}>arrow_forward</Icon>
                    <Typography variant="subtitle2" component="h3">
                      Click here to Sign In
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </>
          )
        }
      </div>
    </AuthFrame>
  );
}


Register.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['common'])(Register);
