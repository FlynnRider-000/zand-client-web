import React, { Fragment } from 'react';
import Head from 'next/head';
import brand from '../static/text/brand';
import ForgotPasswordForm from '../components/Forms/ForgotPassword';
import Notification from '../components/Notification';

function ForgotPassword() {
  return (
    <Fragment>
      <Head>
        <title>
          { brand.crypto.name }
          &nbsp; - Forgot Password
        </title>
      </Head>
      <div>
        <ForgotPasswordForm />
      </div>
      <Notification />
    </Fragment>
  );
}

ForgotPassword.getInitialProps = async () => ({
  namespacesRequired: ['common', 'crypto-landing'],
});

export default ForgotPassword;
