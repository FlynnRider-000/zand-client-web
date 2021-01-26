import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import SunEditor, { buttonList } from 'suneditor-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../static/css/suneditor.min.css';
import {
  IconButton,
  Paper,
  Container,
  Button,
  Typography,
  Box,
  Snackbar,
  TextField,
  Grid
} from '@material-ui/core';

import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import routeLink from '../../static/text/link';
import { withTranslation } from '../../i18n';
import Parallax from '../Parallax/Hexagonal';
import Decoration from './Decoration';
import useStyles from './form-style';
import * as Actions from '../../store/actions/main';

function NewRequest() {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const serviceAdded = useSelector(state => state.main.serviceReducer.serviceAdded);
  const [serviceName, setServiceName] = useState('');
  const [serviceContent, setServiceContent] = useState('');
  const [serviceAddingState, setServiceAddingState] = useState(false);
  const [openNotif, setNotif] = useState(false);

  useEffect(() => {
    // console.log(serviceAdded);
    if (serviceAdded) {
      setServiceAddingState(false);
      dispatch(Actions.serviceAdded(false));
      router.push('/service');
    }
  }, [serviceAdded]);

  const handleClose = () => {
    setNotif(false);
  };

  const addService = () => {
    if (serviceName === '' || serviceContent === '') {
      dispatch(Actions.showNotification('You must input name and content'));
    } else {
      dispatch(Actions.addService({ serviceName, serviceContent }));
      setServiceAddingState(true);
    }
  };

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
        <IconButton href={routeLink.crypto.service} className={clsx(classes.backtohome, classes.invert)}>
          <i className="ion-ios-home" />
          <i className="ion-ios-arrow-thin-left" />
        </IconButton>
        <Paper className={clsx(classes.formBox, 'fragment-fadeUp')}>
          <div className={classes.fullFromWrap}>
            <Typography
              variant="h4"
              align="center"
              className={classes.title}
              gutterBottom
            >
              Add New Service
            </Typography>
            <Grid container style={{ padding: '0px 40px', marginTop: 40 }}>
              <Grid item sm={12} md={1} />
              {
                serviceAddingState ? (
                  <Box display="flex" justifyContent="center" alignItems="center" style={{ width: '100%', height: '400px' }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Grid item sm={12} md={10}>
                    <TextField
                      fullWidth
                      label="Input service name here"
                      variant="filled"
                      style={{ marginBottom: 20 }}
                      value={serviceName}
                      onChange={(event) => setServiceName(event.target.value)}
                    />
                    <SunEditor
                      enableToolbar
                      width="100%"
                      height="500"
                      lang="en"
                      placeholder="Fill Service Details"
                      value={serviceContent}
                      onChange={(content) => setServiceContent(content)}
                      setOptions={{
                        height: 200,
                        buttonList: buttonList.complex
                      }}
                    />
                    <Box display="flex" justifyContent="flex-end">
                      <Button variant="contained" color="primary" onClick={addService} style={{ marginTop: 20, padding: '10px 30px', right: 0 }}>
                        Save
                      </Button>
                    </Box>
                  </Grid>
                )
              }
            </Grid>
          </div>
        </Paper>
      </Container>
    </div>
  );
}

NewRequest.propTypes = {
  // t: PropTypes.func.isRequired
};

export default withTranslation(['common'])(NewRequest);
