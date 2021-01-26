import React, { Fragment } from 'react';
import Head from 'next/head';
import brand from '../static/text/brand';
import MaintainForm from '../components/Forms/Maintain';
import Notification from '../components/Notification';

function Maintain() {
  return (
    <Fragment>
      <Head>
        <title>
          { brand.crypto.name }
          &nbsp; - Maintain
        </title>
      </Head>
      <div>
        <MaintainForm />
      </div>
      <Notification />
    </Fragment>
  );
}

Maintain.getInitialProps = async () => ({
  namespacesRequired: ['common', 'crypto-landing'],
});

export default Maintain;
