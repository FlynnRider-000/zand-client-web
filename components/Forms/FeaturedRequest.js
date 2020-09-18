import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Snackbar,
  CircularProgress,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Parallax from '../Parallax/Hexagonal';
import ReqCard from '../ReqCard';
import useStyles from './form-style';
import faqStyles from '../Faq/faq-style';
import { withTranslation } from '../../i18n';
import { useText } from '../../theme/common';
import * as actionNotification from '../../store/actions/main/notification.actions';
import * as api from '../../api';
import * as Actions from '../../store/actions/main';


function FeaturedRequest() {
  const classes = useStyles();
  const faqClasses = faqStyles();
  const text = useText();
  const router = useRouter();
  const dispatch = useDispatch();

  const [requests, setRequests] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [pageLoadingState, setPageLoadingState] = useState(false);
  const [openNotif, setNotif] = useState(false);


  const getFeaturedRequests = () => {
    let userName;
    api.getAllRequests('all', 'all', userName, true).then((result) => {
      if (result.data.success) {
        if (result.data.requests == null) {
          setRequests([]);
        } else {
          setRequests(result.data.requests);
          setDocuments(result.data.documents);
        }
        setPageLoadingState(false);
      } else {
        dispatch(actionNotification.showNotification('Something went wrong.'));
      }
    });
  };

  useEffect(() => {
    if (pageLoadingState) {
      console.log('page data loaded');
    }
    getFeaturedRequests();
    console.log('getting all requests');
  }, [pageLoadingState]);

  const handleClose = () => {
    setNotif(false);
  };

  const handleViewRequest = (row) => {
    dispatch(Actions.setCurrentRequest(row, '/'));
    router.push('/document');
  };

  return pageLoadingState ? (
    <div>
      <CircularProgress />
    </div>
  ) : (!!(requests && requests.length) && (
    <div className={clsx(classes.pageWrap1, faqClasses.root)} style={{ marginTop: 0, paddingTop: 20, paddingBottom: 20 }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        key="top right"
        open={openNotif}
        autoHideDuration={4000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Message Sent</span>}
      />
      <div className={faqClasses.parallax} style={{ height: 800 }}>
        <Parallax />
      </div>
      <Container maxWidth="xl" className={classes.innerWrap}>
        <div>
          <Typography
            variant="h4"
            align="center"
            className={clsx(classes.title, text.title)}
            gutterBottom
          >
          Featured Requests
          </Typography>
          <div
            className={classes.featuredproducts}
          >
            {requests.map((req) => (
              <div key={req._id + 1}>
                <ReqCard req={req} docCount={documents.filter((doc) => doc.requestId === req._id)} imageUrl={req.imageUrl} onClick={() => handleViewRequest(req)} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  ));
}

export default withTranslation(['common'])(FeaturedRequest);
