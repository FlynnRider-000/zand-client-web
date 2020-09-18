import React, { Fragment } from 'react';
import Head from 'next/head';
import brand from '../static/text/brand';
import RegisterForm from '../components/Forms/Register';
import Notification from '../components/Notification';

function Register() {
  return (
    <Fragment>
      <Head>
        <title>
          { brand.crypto.name }
          &nbsp; - Register
        </title>
      </Head>
      <div>
        <RegisterForm />
      </div>
      <Notification />
    </Fragment>
  );
}

Register.getInitialProps = async () => ({
  namespacesRequired: ['common', 'crypto-landing'],
});

export default Register;
