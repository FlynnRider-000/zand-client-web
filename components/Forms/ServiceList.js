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
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import * as Actions from '../../store/actions/main';

const columns = [
  { id: 'no', label: 'No' },
  { id: 'serviceName', label: 'ServiceName', minWidth: 400 },
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

function ServiceList() {
  const classes = useStyles();
  const text = useText();
  const router = useRouter();

  const dispatch = useDispatch();

  const signInState = useSelector(state => state.main.authReducer.state);
  const decodedToken = useSelector(state => state.main.authReducer.decodedToken);
  const services = useSelector(state => state.main.serviceReducer.services);

  const [pageLoadingState] = useState(false);
  const [openNotif, setNotif] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    if (pageLoadingState) {
      console.log('page data loaded');
    }
    dispatch(Actions.getAllServices());
    dispatch(Actions.getBookedServices());
  }, [pageLoadingState]);

  const handleClose = () => {
    setNotif(false);
  };

  const handleViewService = (row) => {
    dispatch(Actions.setCurrentService(row));
    router.push('/serviceView');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const addNew = () => {
    if (signInState === '') {
      router.push('/login');
    } else {
      router.push('/add-new-service');
    }
  };

  const _renderServiceLists = () => services && (
    <Paper className={classes.tableRoot}>
      {services.length ? (
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
                {services.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, requestIndex) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={'service' + requestIndex} style={{ cursor: 'pointer' }} onClick={() => handleViewService(row)}>
                    {columns.map((column) => {
                      if (column.id === 'no') {
                        return (
                          <TableCell key={column.id} align="center">
                            {requestIndex + 1}
                          </TableCell>
                        );
                      }
                      if (column.id === 'status') {
                        return (
                          <TableCell key={column.id} align="center">
                            <Chip
                              size="small"
                              style={
                                row[column.id] === 'accepted' ? {
                                  backgroundColor: '#28a745',
                                  color: 'white'
                                } : row[column.id] === 'deleted' ? {
                                  backgroundColor: '#f8f9fa'
                                } : {
                                  backgroundColor: '#ffc107',
                                  color: 'black'
                                }
                              }
                              label={row[column.id]}
                            />
                          </TableCell>
                        );
                      }
                      if (column.id === 'createdAt' || column.id === 'updatedAt') {
                        return (
                          <TableCell key={column.id} align="center">
                            {row[column.id].slice(0, 10).replace(/-/g, '/')}
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
            count={services.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <center>
          <Box p={15} pb={decodedToken.userType !== 1 ? 15 : 0}>
            <Typography variant="h6">There is no service.</Typography>
          </Box>
          {
            Number(decodedToken.userType) === 1 && (
              <Box p={2} pb={15}>
                <Button onClick={addNew} variant="outlined" color="primary">Add a Service</Button>
              </Box>
            )
          }
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
              Services
            </Typography>
            <Grid container alignItems="center" style={{ paddingLeft: 30 }}>
              {
                !!(services && services.length && decodedToken.userType === 1) && (
                  <div style={{ marginLeft: 'auto', marginBottom: 10 }}>
                    <Button onClick={addNew} size="small" className={classes.addRequestBtn} variant="contained">
                      Add service
                    </Button>
                  </div>
                )
              }
            </Grid>
            <div>
              { _renderServiceLists() }
            </div>
          </div>
        </Paper>
      </Container>
    </div>
  );
}

export default withTranslation(['common'])(ServiceList);
