import React, { useState, useEffect } from 'react';
import {
  TextField,
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { withTranslation } from '../../i18n';
import useStyles from './form-style';
import * as Actions from '../../store/actions/main';

function RegisterServiceProvider() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();

  const providerRegistered = useSelector(state => state.main.serviceReducer.registerProvider);
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    description: '',
    companyName: ''
  });

  useEffect(() => {
    if (providerRegistered === true) {
      dispatch(Actions.providerRegistered(false));
      router.push('/');
    }
  }, [providerRegistered]);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmitProviderInfo = () => {
    if (values.firstName === ''
      || values.lastName === ''
      || values.phoneNumber === ''
      || values.address === ''
      || values.description === ''
      || values.companyName === ''
    ) {
      return;
    }
    dispatch(Actions.registerServiceProvider(values));
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <center>
          <Typography variant="h4" style={{ margin: '30px 0px' }}>
            Fill Up Data
          </Typography>
        </center>
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="filled"
          className={classes.input}
          label="First Name*"
          onChange={handleChange('firstName')}
          name="firstName"
          value={values.firstName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="filled"
          className={classes.input}
          label="Last Name*"
          onChange={handleChange('lastName')}
          name="lastName"
          value={values.lastName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="filled"
          className={classes.input}
          label="Phone Number*"
          onChange={handleChange('phoneNumber')}
          name="phoneNumber"
          value={values.phoneNumber}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="filled"
          className={classes.input}
          label="Company Name*"
          onChange={handleChange('companyName')}
          name="companyName"
          value={values.companyName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="filled"
          className={classes.input}
          label="Address*"
          onChange={handleChange('address')}
          name="address"
          value={values.address}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="filled"
          className={classes.input}
          label="Description*"
          multiline
          rows="7"
          onChange={handleChange('description')}
          name="description"
          value={values.description}
        />
      </Grid>
      <Grid item xs={12}>
        <center>
          <Button variant="outlined" color="primary" onClick={handleSubmitProviderInfo}>
            Submit Data
          </Button>
        </center>
      </Grid>
    </Grid>
  );
}

RegisterServiceProvider.propTypes = {
  // t: PropTypes.func.isRequired
};

export default withTranslation(['common'])(RegisterServiceProvider);
