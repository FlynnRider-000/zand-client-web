import React, { Fragment } from 'react';
import Head from 'next/head';
import brand from '../static/text/brand';
import ContactForm from '../components/Forms/Contact';

function Contact() {
  return (
    <Fragment>
      <Head>
        <title>
          { brand.crypto.name }
          &nbsp; - Contact
        </title>
      </Head>
      <div>
        <ContactForm />
      </div>
    </Fragment>
  );
}

Contact.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default Contact;
