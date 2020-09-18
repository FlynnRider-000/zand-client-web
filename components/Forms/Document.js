/* eslint-disable prefer-const */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Chip from '@material-ui/core/Chip';
import DescriptionIcon from '@material-ui/icons/Description';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import ViewListIcon from '@material-ui/icons/ViewList';
import Download from '@axetroy/react-download';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useRouter } from 'next/router';
import { useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  Check as CheckIcon,
  Close as CloseIcon,
  HourglassEmpty as HourglassEmptyIcon,
  GetApp as GetAppIcon
} from '@material-ui/icons';
import {
  Button,
  Box,
  Typography,
  IconButton,
  Paper,
  Container,
  Grid,
  Snackbar,
  CircularProgress,
  Tab,
  Tabs,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormControlLabel,
  TextField,
  InputLabel,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions
} from '@material-ui/core';

import Decoration from './Decoration';
import ImageView from '../ImageView';
import { withTranslation } from '../../i18n';
import Parallax from '../Parallax/Hexagonal';
import useStyles from './form-style';
import TabPanel from '../TabPanel';
import config from '../../api/config';
import * as Actions from '../../store/actions/main';
import * as api from '../../api';

function RequestDetailViewTab(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`request-detail-tabpanel-${index}`}
      aria-labelledby={`request-detail-tab-${index}`}
      {...other}
    >
      { value === index && children }
    </div>
  );
}

function requestDetailViewProps(index) {
  return {
    id: `request-detail-tabpanel-${index}`,
    'aria-controls': `request-detail-tab-${index}`,
  };
}

RequestDetailViewTab.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Document() {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [pageLoadingState, setPageLoadingState] = useState(false);
  const [openNotif, setNotif] = useState(false);

  const currentRequest = useSelector((state) => state.main.requestReducer.currentRequest);
  const documents = useSelector((state) => state.main.requestReducer.documents);
  const comments = useSelector((state) => state.main.requestReducer.comments);
  const backUrl = useSelector((state) => state.main.requestReducer.backUrl);
  const files = useSelector((state) => state.main.requestReducer.files);
  const decodedToken = useSelector((state) => state.main.authReducer.decodedToken);
  const editHistory = useSelector((state) => state.main.requestReducer.editHistory);

  const [value, setValue] = React.useState(0);
  const [requestDetailViewIndex, setRequestDetailViewIndex] = React.useState(0);
  const [commentDialogVisible, setCommentDialogVisible] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [editRequestInfo, setEditRequestInfo] = useState('');
  const [attachFiles, setAttachFiles] = useState([]);

  useEffect(() => {
    if (!currentRequest) {
      router.push('/check-request');
    }
    if (!pageLoadingState) {
      dispatch(Actions.getRequestContentById(currentRequest));
    }
  }, []);

  useEffect(() => {
    if (!pageLoadingState && currentRequest && documents && comments && files) {
      setPageLoadingState(true);
    }
    setCommentDialogVisible(false);
  }, [documents, comments, files]);

  useEffect(() => {
    if (pageLoadingState) {
      console.log('page data loaded');
    }
  }, [pageLoadingState]);

  const handleClose = () => {
    setNotif(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRequestDetailViewChanged = (event, newValue) => {
    setRequestDetailViewIndex(newValue);
  };

  const downloadFile = (file) => {
    setIsDownloading(true);
    fetch(config().serverUrl + file.fileName).then(response => {
      response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = true;
        a.click();
        setIsDownloading(false);
      });
    });
  };

  const addComment = (doc) => {
    setCurrentDoc(doc);
    setNewComment('');
    setCommentDialogVisible(true);
  };

  const confirmAddComment = () => {
    console.log(decodedToken);
    api.addComment({
      comment: {
        userName: decodedToken.userName,
        requestId: currentDoc._id,
        commentType: 1,
        description: newComment
      },
      attachFile: attachFiles
    }).then((response) => {
      console.log(response);
      if (!response.success) {
        dispatch(Actions.showNotification('There are issues in submitting documents'));
        setPageLoadingState(true);
      } else {
        dispatch({ type: '[REQ] ADD_COMMENT', payload: response.req });
      }
      setCommentDialogVisible(false);
      setAttachFiles([]);
    });
  };

  const handleAttachFileChanged = (event) => {
    const tmpFile = event.target.files;
    let i;
    const list = [];
    for (i = 0; i < tmpFile.length; i += 1) {
      list.push(tmpFile.item(i));
    }
    setAttachFiles(list);
  };

  const _renderCommentDialog = () => (
    <Dialog open={commentDialogVisible} onClose={() => setCommentDialogVisible(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add a comment</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Comment"
          type="text"
          style={{ width: 400, height: 100 }}
          multiline
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className={classes.attachedFile}>
          <label htmlFor="contained-button-file">
            <Button variant="contained" size="small" color="primary" component="span">
              Add attachment
            </Button>
            <input
              accept="image/*"
              onChange={handleAttachFileChanged}
              className={classes.attachedInput}
              id="contained-button-file"
              multiple
              type="file"
            />
            <ul>
              {
                attachFiles && attachFiles.map((el, index) => <li key={'attachFile' + index}>{el.name}</li>)
              }
            </ul>
          </label>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { setCommentDialogVisible(false); setAttachFiles([]); }} color="secondary">
            Cancel
        </Button>
        <Button onClick={() => confirmAddComment()} color="primary">
            OK
        </Button>
      </DialogActions>
    </Dialog>
  );

  const _renderDocument = () => {
    if (documents.length === 0) {
      return (
        <div style={{
          height: 400,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '15px !important'
        }}
        >
          <Typography variant="h5">There is no Documents for this Request</Typography>
        </div>
      );
    }
    return (
      <div style={{ marginBottom: '15px !important' }}>
        <Box p={10} pt={4} pb={0}>
          <div className={classes.tabContainer}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              style={{ minWidth: 140 }}
              aria-label="Vertical tabs example"
              className={classes.tabs}
            >
              {
                documents.map((doc, index) => (
                  <Tab label={doc.docType} style={{ minWidth: 140, wordWrap: 'break' }} {...a11yProps(index)} key={'Tab -- ' + index} icon={doc.status === 'accepted' ? (<CheckIcon style={{ fontSize: 18, marginBottom: 0 }} />) : (doc.status === 'rejected' ? (<CloseIcon style={{ fontSize: 18, marginBottom: 0 }} />) : (<HourglassEmptyIcon style={{ fontSize: 18, marginBottom: 0 }} />))} classes={{ wrapper: classes.leftIcon }} />
                ))
              }
            </Tabs>
            {
              documents.map((doc, index) => (
                <TabPanel value={value} index={index} key={'TabPanel -- ' + index}>
                  <div style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'nowrap',
                    width: '100%',
                    display: '-webkit-inline-box',
                    minHeight: 400
                  }}
                  >
                    <div style={{ width: 'calc( 100% - 200px )' }}>
                      <Box m={2} pt={2} mb={0}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item>
                            <Typography variant="subtitle1">
                              <b>
                                {doc.name}
                                {' ( '}
                                {doc.status.slice(0, 1).toUpperCase() + doc.status.slice(1, doc.status.length)}
                                {' )'}
                              </b>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box m={3} mt={0}>
                        <Typography variant="subtitle2">{doc.description}</Typography>
                      </Box>
                      {
                        decodedToken.userName === currentRequest.userName && (
                          <>
                            <Box m={2} mt={0}>
                              <Typography variant="subtitle1"><b>Activity</b></Typography>
                            </Box>
                            <Timeline align="alternate">
                              {comments.length > 0 && comments.length > 0 && comments.filter((comment) => comment.requestId === doc._id).map((comment, index1) => {
                                if (index1 % 2 === 0) {
                                  return (
                                    <TimelineItem key={'comment' + index1}>
                                      <TimelineOppositeContent style={{ flex: 0, minWidth: 120, paddingLeft: 0 }}>
                                        <Typography color="textSecondary">{comment.updatedAt.slice(0, 10)}</Typography>
                                      </TimelineOppositeContent>
                                      <TimelineSeparator>
                                        {comment.commentType ? <TimelineDot color="primary" /> : <TimelineDot color="secondary" /> }
                                        <TimelineConnector />
                                      </TimelineSeparator>
                                      <TimelineContent>
                                        <Box m={2} mt={0}>
                                          <b>
                                            <big>{comment.userName}</big>
                                          </b>
                                          <br />
                                          <font style={{ marginLeft: theme.spacing(1) }}>
                                            {comment.description}
                                          </font>
                                        </Box>
                                        <Divider />
                                      </TimelineContent>
                                    </TimelineItem>
                                  );
                                }
                                return (
                                  <TimelineItem key={'comment' + index1}>
                                    <TimelineOppositeContent>
                                      <Box m={2} mt={0}>
                                        <b>
                                          <big>{comment.userName}</big>
                                        </b>
                                        <br />
                                        <font style={{ marginLeft: theme.spacing(1) }}>
                                          {comment.description}
                                        </font>
                                      </Box>
                                      <Divider />
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                      {comment.commentType ? <TimelineDot color="primary" /> : <TimelineDot color="secondary" /> }
                                      <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent style={{ flex: 0, minWidth: 120, paddingLeft: 0 }}>
                                      <Typography color="textSecondary">{comment.updatedAt.slice(0, 10)}</Typography>
                                    </TimelineContent>
                                  </TimelineItem>
                                );
                              })}
                            </Timeline>
                            <center style={{ width: '100%' }}>
                              <Button color="primary" variant="contained" onClick={() => addComment(doc)}>Add a comment</Button>
                            </center>
                          </>
                        )
                      }
                    </div>
                    <div style={{ borderLeft: '1px solid lightgray' }}>
                      <Box component="div" className={classes.listBorder}>
                        <div component="nav" className={classes.fileList} aria-label="mailbox folders">
                          {
                            files.filter((file) => file.documentId === doc._id).map((file, fileIndex) => (
                              <Button style={{ width: '100%', alignItems: 'left' }} key={'Download Link -- ' + fileIndex} href={config().serverUrl + file.fileName} target="_blank" download>
                                <GetAppIcon style={{ marginBottom: -7, float: 'left' }} />
                                <div style={{
                                  maxWidth: 160, wordWrap: 'break', width: '100%', textAlign: 'left'
                                }}
                                >
                                  <font style={file.status === 'attached' ? { wordWrap: 'break-word', color: '#03a9f4' } : { wordWrap: 'break-word' }}>{file.name}</font>
                                </div>
                              </Button>
                            ))
                          }
                        </div>
                      </Box>
                    </div>
                  </div>
                </TabPanel>
              ))
            }
          </div>
        </Box>
      </div>
    );
  };

  const _renderForm = () => {
    if (!pageLoadingState) {
      return (
        <div style={{ marginBottom: '15px !important' }}>
          <CircularProgress />
        </div>
      );
    }
    return _renderDocument();
  };
  const _renderFileDownloadingDialog = () => (
    <Dialog open={isDownloading}>
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );

  const _renderProductImage = () => {
    const productImageDocIds = [];
    const len = documents.length;
    for (let i = 0; i < len; i += 1) {
      if (documents[i].docType === 'Product Image') {
        productImageDocIds.push(documents[i]._id);
      }
    }

    if (productImageDocIds.length === 0) {
      return (
        <>
          <center>
            <img width="90%" style={{ padding: '5%' }} src="/static/images/no-product-image.png" alt="No Product Available" />
            {' '}
          </center>
        </>
      );
    }

    const imageFiles = files.filter((file) => productImageDocIds.includes(file.documentId));

    return imageFiles.length ? (
      <Box m={3}>
        <ImageView tileData={imageFiles.map((image) => ({
          img: config().serverUrl + image.fileName,
          title: image.name,
          _id: image._id
        }))}
        />
      </Box>
    ) : (
      <>
        <center>
          <img width="90%" style={{ padding: '5%' }} src="/static/images/no-product-image.png" alt="No Product Available" />
          {' '}
        </center>
      </>
    );
  };

  const handleEditRequestInfo = (e) => {
    setEditRequestInfo(e.target.value);
  };

  const sendEditRequest = () => {
    dispatch(Actions.editRequest({
      reqId: currentRequest._id,
      editInfo: editRequestInfo
    }));
  };

  console.log(currentRequest);

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
        <IconButton href={backUrl} className={clsx(classes.backtohome, classes.invert)}>
          <i className="ion-ios-home" />
          <i className="ion-ios-arrow-thin-left" />
        </IconButton>
        <Paper className={clsx(classes.formBox, 'fragment-fadeUp')}>
          <div className={classes.documentViewWrap}>
            <Tabs
              value={requestDetailViewIndex}
              onChange={handleRequestDetailViewChanged}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label={(
                <div>
                  <ViewListIcon style={{ verticalAlign: 'middle' }} />
                  {' '}
                  Details
                  {' '}
                </div>
              )}
              />
              <Tab label={(
                <div>
                  <DescriptionIcon style={{ verticalAlign: 'middle' }} />
                  {' '}
                  Documents
                  {' '}
                </div>
              )}
              />
            </Tabs>
            <RequestDetailViewTab value={requestDetailViewIndex} index={0} {...requestDetailViewProps(0)}>
              <div className={classes.requestDetails}>
                <Grid container direction="row" style={{ marginBottom: 30 }}>
                  <Grid item sm={10} md={9} lg={6}>
                    <center>
                      <div style={{ width: '85%' }}>
                        {documents && _renderProductImage()}
                      </div>
                    </center>
                  </Grid>
                  <Grid item sm={12} md={12} lg={6}>
                    <table style={{ paddingBottom: 15 }}>
                      <tbody>
                        <tr>
                          <td style={{
                            paddingTop: theme.spacing(2), verticalAlign: 'baseline', textAlign: 'right', minWidth: 150
                          }}
                          >
                            <b>User</b>
                          </td>
                          <td style={{
                            paddingTop: theme.spacing(2), paddingBottom: theme.spacing(1), paddingLeft: '15px', textAlign: 'left'
                          }}
                          >
                            {currentRequest.userName}
                          </td>
                        </tr>
                        <tr>
                          <td style={{
                            paddingTop: theme.spacing(2), verticalAlign: 'baseline', textAlign: 'right', minWidth: 150
                          }}
                          >
                            <b>Product</b>
                          </td>
                          <td style={{
                            paddingTop: theme.spacing(2), paddingBottom: theme.spacing(1), paddingLeft: '15px', textAlign: 'left'
                          }}
                          >
                            {currentRequest.productName}
                          </td>
                        </tr>
                        <tr>
                          <td style={{
                            paddingTop: theme.spacing(2), verticalAlign: 'baseline', textAlign: 'right', minWidth: 150
                          }}
                          >
                            <b>Model</b>
                          </td>
                          <td style={{
                            paddingTop: theme.spacing(2), paddingBottom: theme.spacing(1), paddingLeft: '15px', textAlign: 'left'
                          }}
                          >
                            {currentRequest.model}
                          </td>
                        </tr>
                        <tr>
                          <td style={{
                            paddingTop: theme.spacing(2), verticalAlign: 'baseline', textAlign: 'right', minWidth: 150
                          }}
                          >
                            <b>Quantity</b>
                          </td>
                          <td style={{
                            paddingTop: theme.spacing(2), paddingBottom: theme.spacing(1), paddingLeft: '15px', textAlign: 'left'
                          }}
                          >
                            {currentRequest.quantity}
                          </td>
                        </tr>
                        {
                          currentRequest.requestType === 0 && (
                            <tr>
                              <td style={{
                                paddingTop: theme.spacing(2), verticalAlign: 'baseline', textAlign: 'right', minWidth: 150
                              }}
                              >
                                <b>Intended Use</b>
                              </td>
                              <td style={{
                                paddingTop: theme.spacing(2), paddingBottom: theme.spacing(1), paddingLeft: '15px', textAlign: 'left'
                              }}
                              >
                                {currentRequest.intendedUse}
                              </td>
                            </tr>
                          )
                        }
                        <tr>
                          <td style={{
                            paddingTop: theme.spacing(2), verticalAlign: 'baseline', textAlign: 'right', minWidth: 150
                          }}
                          >
                            <b>
                              Product
                              <br />
                              {' '}
                              Produced Type
                            </b>
                          </td>
                          <td style={{
                            paddingTop: theme.spacing(2), paddingBottom: theme.spacing(1), paddingLeft: '15px', textAlign: 'left'
                          }}
                          >
                            {currentRequest.productProducedType}
                          </td>
                        </tr>
                        <tr>
                          <td style={{
                            paddingTop: theme.spacing(2), verticalAlign: 'baseline', textAlign: 'right', minWidth: 150
                          }}
                          >
                            <b>Price</b>
                          </td>
                          <td style={{
                            paddingTop: theme.spacing(2), paddingBottom: theme.spacing(1), paddingLeft: '15px', textAlign: 'left'
                          }}
                          >
                            {currentRequest.priceMin}
                            {currentRequest.requestType === 0 ? ' ~ ' + currentRequest.priceMax : ''}
                          </td>
                        </tr>
                        <tr>
                          <td style={{
                            paddingTop: theme.spacing(2), verticalAlign: 'baseline', textAlign: 'right', minWidth: 150
                          }}
                          >
                            <b>Commission</b>
                          </td>
                          <td style={{
                            paddingTop: theme.spacing(2), paddingBottom: theme.spacing(1), paddingLeft: '15px', textAlign: 'left'
                          }}
                          >
                            {currentRequest.commission}
                          </td>
                        </tr>
                        <tr>
                          <td style={{
                            paddingTop: theme.spacing(2), verticalAlign: 'baseline', textAlign: 'right', minWidth: 150
                          }}
                          >
                            <b>{currentRequest.requestType ? 'Destination' : 'Stock Location'}</b>
                          </td>
                          <td style={{
                            paddingTop: theme.spacing(2), paddingBottom: theme.spacing(1), paddingLeft: '15px', textAlign: 'left'
                          }}
                          >
                            {currentRequest.deliveryLocation}
                          </td>
                        </tr>
                        <tr>
                          <td style={{
                            paddingTop: theme.spacing(2), verticalAlign: 'baseline', textAlign: 'right', minWidth: 150
                          }}
                          >
                            <b>Created At</b>
                          </td>
                          <td style={{
                            paddingTop: theme.spacing(2), paddingBottom: theme.spacing(1), paddingLeft: '15px', textAlign: 'left'
                          }}
                          >
                            {currentRequest.createdAt.slice(0, 10)}
                          </td>
                        </tr>
                        <tr>
                          <td style={{
                            paddingTop: theme.spacing(2), verticalAlign: 'baseline', textAlign: 'right', minWidth: 150
                          }}
                          >
                            <b>Product Category</b>
                          </td>
                          <td style={{
                            paddingTop: theme.spacing(2), paddingBottom: theme.spacing(1), paddingLeft: '15px', textAlign: 'left'
                          }}
                          >
                            {currentRequest.productCategory}
                          </td>
                        </tr>
                        <tr>
                          <td style={{
                            paddingTop: theme.spacing(2), verticalAlign: 'baseline', textAlign: 'right', minWidth: 150
                          }}
                          >
                            <b>Featured</b>
                          </td>
                          <td style={{
                            paddingTop: theme.spacing(2), paddingBottom: theme.spacing(1), paddingLeft: '15px', textAlign: 'left'
                          }}
                          >
                            <Chip
                              size="small"
                              label={currentRequest.featured ? 'Featured' : 'Not Featured'}
                              clickable
                              color={currentRequest.featured ? 'primary' : 'default'}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td style={{
                            paddingTop: theme.spacing(2), verticalAlign: 'baseline', textAlign: 'right', minWidth: 150
                          }}
                          >
                            <b>Status</b>
                          </td>
                          <td style={{
                            paddingTop: theme.spacing(2), paddingBottom: theme.spacing(1), paddingLeft: '15px', textAlign: 'left'
                          }}
                          >
                            {currentRequest.productStatus}
                          </td>
                        </tr>
                        <tr>
                          <td style={{
                            paddingTop: theme.spacing(2), verticalAlign: 'baseline', textAlign: 'right', minWidth: 150
                          }}
                          >
                            <b>Description</b>
                          </td>
                          <td style={{
                            paddingTop: theme.spacing(2), paddingBottom: theme.spacing(1), lineHeight: '1.85em', paddingLeft: '15px', textAlign: 'left'
                          }}
                          >
                            {currentRequest.description}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography variant="subtitle1">Update Request</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={4}>
                          <Grid item xs={12}>
                            <Box pt={1} display="flex" flexDirection="column">
                              <TextField
                                variant="filled"
                                multiline
                                rows="8"
                                className={classes.input}
                                label="Fill Request Information"
                                onChange={handleEditRequestInfo}
                                value={editRequestInfo}
                                style={{ marginTop: 10 }}
                              />
                              <Button variant="contained" color="secondary" size="small" style={{ marginTop: 10 }} onClick={sendEditRequest}>
                                Send Edit Request
                              </Button>
                            </Box>
                            <Typography size="h4" style={{ marginTop: 40 }}>
                              Request Updated List
                            </Typography>
                            <Box pt={2} display="flex" flexdirecion="column">
                              <Timeline align="alternate">
                                {
                                  editHistory.length > 0 && editHistory.map((history, index1) => {
                                    if (index1 % 2 === 0) {
                                      return (
                                        <TimelineItem key={'history' + index1}>
                                          <TimelineOppositeContent style={{ flex: 0, minWidth: 120, paddingLeft: 0 }}>
                                            <Typography color="textSecondary">{history.updatedAt.slice(0, 10)}</Typography>
                                          </TimelineOppositeContent>
                                          <TimelineSeparator>
                                            <TimelineDot color={history.done ? 'primary' : ''} />
                                            <TimelineConnector />
                                          </TimelineSeparator>
                                          <TimelineContent>
                                            <Box m={2} mt={0} style={{ display: 'flex', flexDirection: 'row' }}>
                                              { history.done ? <CheckIcon style={{ fontSize: 20 }} /> : <HourglassEmptyIcon style={{ fontSize: 20 }} />}
                                              <font style={{ marginLeft: theme.spacing(1) }}>
                                                {history.content}
                                              </font>
                                            </Box>
                                          </TimelineContent>
                                        </TimelineItem>
                                      );
                                    }
                                    return (
                                      <TimelineItem key={'history' + index1}>
                                        <TimelineOppositeContent>
                                          <Box m={2} mt={0} style={{ display: 'flex', flexDirection: 'row' }}>
                                            { history.done ? <CheckIcon style={{ fontSize: 20 }} /> : <HourglassEmptyIcon style={{ fontSize: 20 }} />}
                                            <font style={{ marginLeft: theme.spacing(1) }}>
                                              {history.content}
                                            </font>
                                          </Box>
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                          <TimelineDot color={history.done ? 'primary' : ''} />
                                          <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent style={{ flex: 0, minWidth: 120, paddingLeft: 0 }}>
                                          <Typography color="textSecondary">{history.updatedAt.slice(0, 10)}</Typography>
                                        </TimelineContent>
                                      </TimelineItem>
                                    );
                                  })
                                }
                              </Timeline>
                            </Box>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                      {/* <AccordionActions>
                        <Button size="small" onClick={() => { handleDeleteDocument(key); }}>Delete</Button>
                      </AccordionActions> */}
                    </Accordion>
                  </Grid>
                </Grid>
              </div>
            </RequestDetailViewTab>
            <RequestDetailViewTab value={requestDetailViewIndex} index={1} {...requestDetailViewProps(1)}>
              { _renderForm() }
            </RequestDetailViewTab>
          </div>
        </Paper>
        {_renderFileDownloadingDialog()}
      </Container>
      {_renderCommentDialog()}
    </div>
  );
}

export default withTranslation(['common'])(Document);
