/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useDispatch } from 'react-redux';
import * as Actions from '../../store/actions/main';
import { withTranslation } from '../../i18n';
import Title from '../Title/TitleSecondary';
import AuthFrame from './AuthFrame';
import useStyles from './form-style';

function ForgotPassword(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = props;
  const [values, setValues] = useState({
    email: ''
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = () => {
    dispatch(Actions.resetPassword({
      email: values.email
    }));
  };

  return (
    <AuthFrame title={t('common:login_title')} subtitle={t('common:login_subtitle')}>
      <div>
        <div className={classes.head} style={{marginTop: 30}}>
          <Title align="left">
            Forgot Password?
          </Title>
          <Button size="small" className={classes.buttonLink} onClick={() => router.push('/login')}>
            <Icon className={clsx(classes.icon, classes.signArrow)}>arrow_backward</Icon>
            Back
          </Button>
        </div>
        <ValidatorForm
          onSubmit={() => { console.log('Login'); }}
        >
          <Grid container spacing={3} style={{marginTop: 120}}>
            <Grid item sm={9} xs={12}>
              <TextValidator
                variant="filled"
                className={classes.input}
                label={t('common:login_email')}
                onChange={handleChange('email')}
                name="email"
                value={values.email}
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'Email is not valid']}
              />
            </Grid>
            <Grid item sm={3} xs={12} style={{alignItems: 'center', display: 'flex'}}>
              <Button variant="contained" fullWidth type="submit" onClick={handleSubmit} color="secondary" size="large">
                Reset
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    </AuthFrame>
  );
}


ForgotPassword.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['crypto-landing', 'common'])(ForgotPassword);
