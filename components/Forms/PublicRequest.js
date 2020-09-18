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

import ReqCard from '../ReqCard';
import { withTranslation } from '../../i18n';
import { useText } from '../../theme/common';
import useStyles from './form-style';
import usePromotionStyles from '../Promotion/promotion-style';
import * as actionNotification from '../../store/actions/main/notification.actions';
import * as api from '../../api';
import * as Actions from '../../store/actions/main';


function PublicRequest() {
  const classes = useStyles();
  const promotionClasses = usePromotionStyles();
  const text = useText();
  const router = useRouter();
  const dispatch = useDispatch();

  const [requests, setRequests] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [pageLoadingState, setPageLoadingState] = useState(false);
  const [openNotif, setNotif] = useState(false);


  const getAllRequests = (requestType) => {
    api.getAllRequests(requestType, 'accepted').then((result) => {
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
    getAllRequests('all');
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
    <div className={clsx(classes.pageWrap1, promotionClasses.root)}>
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
      <Container maxWidth="xl" className={classes.innerWrap}>
        <div className={classes.fullFromWrap1}>
          <Typography
            variant="h4"
            align="center"
            className={clsx(classes.title, text.title)}
            gutterBottom
          >
          Hot
          </Typography>
          <div
            className={classes.hotproducts}
          >
            {requests.map((req) => (
              <div key={req._id + 1} style={{ display: 'flex' }}>
                <ReqCard req={req} docCount={documents.filter((doc) => doc.requestId === req._id)} imageUrl={req.imageUrl} onClick={() => handleViewRequest(req)} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  ));
}

PublicRequest.propTypes = {
  // t: PropTypes.func.isRequired
};

export default withTranslation(['common'])(PublicRequest);
