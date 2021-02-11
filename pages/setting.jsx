import React, { Fragment } from 'react';
import Head from 'next/head';
import brand from '../static/text/brand';
import SettingForm from '../components/Forms/Setting';
import Notification from '../components/Notification';

function Setting() {
  return (
    <Fragment>
      <Head>
        <title>
          { brand.crypto.name }
          &nbsp; - Setting
        </title>
      </Head>
      <div>
        <SettingForm />
        <Notification />
      </div>
    </Fragment>
  );
}

Setting.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default Setting;
