/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { useSelector, useDispatch } from 'react-redux';

import { withTranslation } from '../../i18n';
import { useText } from '../../theme/common';
import routeLink from '../../static/text/link';
import Parallax from '../Parallax/Hexagonal';
import useStyles from './form-style';
import Decoration from './Decoration';
import * as actionNotification from '../../store/actions/main/notification.actions';
import * as api from '../../api';
import * as Actions from '../../store/actions/main';

const columns = [
  { id: 'productName', label: 'ProductName', minWidth: 150 },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 50,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 150,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'commission',
    label: 'Commission',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'createdAt',
    label: 'Created At',
    minWidth: 120,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'updatedAt',
    label: 'Updated At',
    minWidth: 120,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    format: (value) => value.toFixed(2),
  },
];

function CheckRequest() {
  const classes = useStyles();
  const text = useText();
  const router = useRouter();

  const dispatch = useDispatch();

  const decodedToken = useSelector(state => state.main.authReducer.decodedToken);
  const signInState = useSelector(state => state.main.authReducer.state);
  const [requests, setRequests] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [pageLoadingState, setPageLoadingState] = useState(false);
  const [openNotif, setNotif] = useState(false);

  const [reqType, setReqType] = useState('Buyer');
  const [reqStatus, setReqStatus] = useState('all');

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const getAllRequests = (requestType, requestStatus) => {
    api.getAllRequests(requestType, requestStatus, decodedToken.userName).then((result) => {
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
      // console.log('page data loaded');
    }
    getAllRequests(reqType, reqStatus);
    // console.log('getting all requests');
  }, [pageLoadingState]);

  const handleClose = () => {
    setNotif(false);
  };

  const getAcceptedFileCount = (reqId) => {
    if (documents) {
      const len = documents.length;
      let acceptedCnt = 0;
      for (let i = 0; i < len; i += 1) if (documents[i].requestId === reqId && documents[i].status === 'accepted') acceptedCnt += 1;
      return acceptedCnt;
    }
    return 0;
  };

  const getPendingFileCount = (reqId) => {
    if (documents) {
      const len = documents.length;
      let pendingCnt = 0;
      for (let i = 0; i < len; i += 1) if (documents[i].requestId === reqId && documents[i].status === 'pending') pendingCnt += 1;
      return pendingCnt;
    }
    return 0;
  };

  const handleViewRequest = (row) => {
    dispatch(Actions.setCurrentRequest(row, '/check-request'));
    router.push('/document');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleRequestTypeChange = (event) => {
    setReqType(event.target.value);
    getAllRequests(event.target.value, reqStatus);
  };

  const handleRequestStatusChange = (event) => {
    setReqStatus(event.target.value);
    getAllRequests(reqType, event.target.value);
  };

  const addNew = () => {
    if (signInState === '') {
      router.push('/login');
    } else {
      router.push('/add-new');
    }
  };

  const _renderRequests = () => !!requests && (
    <Paper className={classes.tableRoot}>
      {requests.length ? (
        <>
          <TableContainer className={classes.tableContainer}>
            <Table stickyHeader aria-label="sticky table" size="small">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="center"
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, requestIndex) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={'request' + requestIndex} style={{ cursor: 'pointer' }} onClick={() => handleViewRequest(row)}>
                    {columns.map((column) => {
                      if (column.id === 'price') {
                        const { priceMin, priceMax, requestType } = row;
                        return (
                          <TableCell key={column.id} align="center">
                            {requestType === 0 ? (priceMin + ' ~ ' + priceMax) : priceMin}
                          </TableCell>
                        );
                      }
                      if (column.id === 'status') {
                        const acpCnt = getAcceptedFileCount(row._id);
                        const pndCnt = getPendingFileCount(row._id);
                        return (
                          <TableCell key={column.id} align="center">
                            {row[column.id] + ' (' + (acpCnt + pndCnt) + '/' + pndCnt + ')'}
                          </TableCell>
                        );
                      }
                      if (column.id === 'createdAt' || column.id === 'updatedAt') {
                        return (
                          <TableCell key={column.id} align="center">
                            {row[column.id].slice(0, 10)}
                          </TableCell>
                        );
                      }
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align="center">
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={requests.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <center>
          <Box p={15} pb={0}>
            <Typography variant="h6">There is no requet.</Typography>
          </Box>
          <Box p={2} pb={15}>
            <Button onClick={() => router.push('/add-new')} variant="outlined" color="primary">Add a request</Button>
          </Box>
        </center>
      )}
    </Paper>
  );

  return pageLoadingState ? (
    <div>
      <CircularProgress />
    </div>
  ) : (
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
        <IconButton href={routeLink.crypto.home} className={clsx(classes.backtohome, classes.invert)}>
          <i className="ion-ios-home" />
          <i className="ion-ios-arrow-thin-left" />
        </IconButton>
        <Paper className={clsx(classes.formBox, 'fragment-fadeUp')}>
          <div className={classes.fullFromWrap}>
            <Typography
              variant="h4"
              align="center"
              className={clsx(classes.title, text.title)}
              gutterBottom
            >
              Check Requests
            </Typography>
            <Grid container alignItems="center" style={{ paddingLeft: 30 }}>
              <FormControl component="fieldset">
                <RadioGroup row aria-label="gender" name="requestType" value={reqType} onChange={handleRequestTypeChange}>
                  <FormControlLabel value="Buyer" control={<Radio />} label="Buyer" />
                  <FormControlLabel value="Seller" control={<Radio />} label="Seller" />
                </RadioGroup>
              </FormControl>
              <Divider orientation="vertical" flexItem />
              <FormControl className={classes.requestStatusSelect}>
                <Select
                  value={reqStatus}
                  onChange={handleRequestStatusChange}
                  displayEmpty
                  className={classes.selectEmpty}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="accepted">Accepted</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
              {
                !!(requests && requests.length > 0) && (
                  <div style={{ marginLeft: 'auto' }}>
                    <Button onClick={addNew} size="small" className={classes.addRequestBtn} variant="contained">
                      Add Request
                    </Button>
                  </div>
                )
              }
            </Grid>
            <div>
              { _renderRequests() }
            </div>
          </div>
        </Paper>
      </Container>
    </div>
  );
}

export default withTranslation(['common'])(CheckRequest);
