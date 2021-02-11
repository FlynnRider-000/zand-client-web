/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import { useRouter } from 'next/router';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../static/images/zandcell-logo.png';
import brand from '../../static/text/brand';
import routeLink from '../../static/text/link';
import { withTranslation } from '../../i18n';
import { useText } from '../../theme/common';
import Parallax from '../Parallax/Hexagonal';
import Decoration from './Decoration';
import useStyles from './form-style';
import * as Actions from '../../store/actions/main';

function Contact(props) {
  const classes = useStyles();
  const text = useText();
  const dispatch = useDispatch();
  const { t } = props;
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [values, setValues] = useState({
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [openNotif, setNotif] = useState(false);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = () => {
    dispatch(Actions.updatePassword({
      password: values.password,
      newPassword: values.newPassword
    }));
  };

  const handleClose = () => {
    setNotif(false);
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== values.newPassword) {
        return false;
      }
      return true;
    });
  });

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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
              Settings
            </Typography>
            <div className={classes.form}>
              <ValidatorForm
                onSubmit={handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextValidator
                      variant="filled"
                      type="password"
                      className={classes.input}
                      label="Current Password *"
                      onChange={handleChange('password')}
                      name="password"
                      value={values.password}
                      validators={['required']}
                      errorMessages={['This field is required']}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextValidator
                      variant="filled"
                      type="password"
                      className={classes.input}
                      label="New Password *"
                      onChange={handleChange('newPassword')}
                      name="newPassword"
                      value={values.newPassword}
                      validators={['required']}
                      errorMessages={['This field is required']}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextValidator
                      variant="filled"
                      type="password"
                      className={classes.input}
                      label="Confirm Password *"
                      onChange={handleChange('confirmPassword')}
                      name="confirmPassword"
                      value={values.confirmPassword}
                      validators={['isPasswordMatch', 'required']}
                      errorMessages={['New Password Mismatch', 'This field is required']}
                    />
                  </Grid>
                </Grid>
                <div className={clsx(classes.btnArea, classes.flex, classes.btnCenterAlign)}>
                  <Button variant="contained" fullWidth={isMobile} type="submit" color="secondary" size="medium">
                    Update Password
                  </Button>
                </div>
              </ValidatorForm>
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
