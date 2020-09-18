import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import 'suneditor/dist/css/suneditor.min.css';
import {
  IconButton,
  Paper,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
  Dialog,
  DialogTitle,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Chip,
  Tab,
  Tabs,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Grid
} from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import routeLink from '../../static/text/link';
import { withTranslation } from '../../i18n';
import Parallax from '../Parallax/Hexagonal';
import Decoration from './Decoration';
import useStyles from './form-style';

import * as Actions from '../../store/actions/main';

function TabPanel(props) {
  const {
    children,
    value,
    index,
    ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function NewRequest() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentService = useSelector(state => state.main.serviceReducer.currentService);
  const bookedServices = useSelector(state => state.main.serviceReducer.bookedServices);
  const providerInfo = useSelector(state => state.main.serviceReducer.providerInfo);
  const bookList = useSelector(state => state.main.serviceReducer.bookList);
  const bookInfo = useSelector(state => state.main.serviceReducer.bookInfo);
  const decodedToken = useSelector(state => state.main.authReducer.decodedToken);
  const router = useRouter();
  const [openNotif, setNotif] = useState(false);
  const [bookServiceDlgOpen, setBookServiceDlgOpen] = useState(false);
  const [unBookConfirmDlgOpen, setUnBookConfirmDlgOpen] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
  });

  useEffect(() => {
    if (decodedToken.userType === 1) {
      dispatch(Actions.getBookListByServiceId(currentService._id));
    } else if (decodedToken.userType === 2) {
      dispatch(Actions.getBookInfoByServIdUsrName(currentService._id));
    }
    dispatch(Actions.getProviderInfo(currentService._id));
  }, []);

  const handleClientInfoChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleStartDateChange = date => {
    setValues({ ...values, startDate: date });
  };

  const handleEndDateChange = date => {
    setValues({ ...values, endDate: date });
  };

  const handleClose = () => {
    setNotif(false);
  };

  const handleBookService = () => {
    if (values.firstName === ''
      || values.lastName === ''
      || values.phoneNumber === ''
      || values.address === ''
      || values.description === ''
      || values.startDate === ''
      || values.endDate === ''
    ) {
      return;
    }
    dispatch(Actions.bookService({ ...values, serviceId: currentService._id }));
    setBookServiceDlgOpen(false);
  };

  const handleUnBookService = () => {
    const bookInformation = bookedServices.filter((service) => service.serviceId === currentService._id && service.status === '');
    dispatch(Actions.unbookService({ bookId: bookInformation[0]._id }));
    setUnBookConfirmDlgOpen(false);
  };

  const handleBookServiceDlgClose = () => {
    setBookServiceDlgOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleBookChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleAcceptCancelBookRequest = (bkId) => {
    dispatch(Actions.acceptCancelBookRequest({ bookId: bkId, serviceId: currentService._id }));
  };

  const isBookedService = bookedServices && bookedServices.filter((service) => service.serviceId === currentService._id && service.status === '').length === 1;
  const isUnBookedService = bookedServices && bookedServices.filter((service) => service.serviceId === currentService._id && service.status === 'cancelled').length === 1;

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
        <IconButton onClick={() => router.push(routeLink.crypto.service)} className={clsx(classes.backtohome, classes.invert)}>
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
              {
                currentService.serviceName
              }
            </Typography>
            {
              Number(decodedToken.userType) === 2 && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    {
                      (!isBookedService && !isUnBookedService) && (
                        <Button onClick={() => setBookServiceDlgOpen(true)} variant="outlined" size="small" color="primary" style={{ margin: '20px 30px 0px 0px' }}>
                          Book Service
                        </Button>
                      )
                    }
                    {
                      isUnBookedService && (
                        <>
                          <Typography variant="caption" display="block" style={{ margin: '20px 30px 0px 0px' }}>
                            You cancelled booking, wait until your request is accepted
                          </Typography>
                        </>
                      )
                    }
                    {
                      isBookedService && !isUnBookedService && (
                        <>
                          <Typography variant="caption" display="block" style={{ margin: '20px 30px 0px 0px' }}>
                            You booked this Service
                          </Typography>
                          <Typography variant="caption" display="block" style={{ margin: '0px 30px 0px 0px' }}>
                            {bookInfo && (bookInfo.startDate + ' ~ ' + bookInfo.endDate)}
                          </Typography>
                          <Button onClick={() => setUnBookConfirmDlgOpen(true)} variant="outlined" size="small" color="primary" style={{ padding: '3(false)px 9px', margin: '0px 30px 0px 0px' }}>
                            Cancel booking?
                          </Button>
                        </>
                      )
                    }
                  </div>
                </>
              )
            }
            <Grid container style={{ padding: '0px 40px', margin: '40px 0px 50px 0px' }}>
              <Grid item sm={12} md={1} />
              <Grid item sm={12} md={10}>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                  <Tab label="Content" {...a11yProps(0)} />
                  <Tab label="Provider Info" {...a11yProps(1)} />
                  {
                    Number(decodedToken.userType) !== 2 && (
                      <Tab label="Book List" {...a11yProps(2)} />
                    )
                  }
                </Tabs>
                <TabPanel value={value} index={0}>
                  <div
                    style={{ marginTop: 30, marginBottom: 30, paddingLeft: 10 }}
                    dangerouslySetInnerHTML={{
                      __html: currentService.content
                    }}
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <TableContainer component={Paper} style={{ margin: '15px 0px 0px 0px' }}>
                        { providerInfo && (
                          <Table>
                            <TableBody>
                              <TableRow>
                                <TableCell align="left">First Name</TableCell>
                                <TableCell align="right">{providerInfo.firstName}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">Last Name</TableCell>
                                <TableCell align="right">{providerInfo.lastName}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">Phone Number</TableCell>
                                <TableCell align="right">{providerInfo.phoneNumber}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">Company Name</TableCell>
                                <TableCell align="right">{providerInfo.companyName}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">Address</TableCell>
                                <TableCell align="right">{providerInfo.address}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        )}
                      </TableContainer>
                    </Grid>
                  </Grid>
                </TabPanel>
                {
                  Number(decodedToken.userType) !== 2 && (
                    <TabPanel value={value} index={2}>
                      <Box pt={1}>
                        {
                          bookList && bookList.length ? bookList.map((el) => (
                            <Accordion key={el.userName} expanded={expanded === el.userName} onChange={handleBookChange(el.userName)}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                              >
                                <Box
                                  display="flex"
                                  flexDirection="row"
                                  justifyContent="space-between"
                                  style={{
                                    width: '100%',
                                    padding: '0px 10px',
                                  }}
                                >
                                  <Typography className={classes.heading}>{el.userName}</Typography>
                                  <Chip
                                    size="small"
                                    style={
                                      el.status === '' ? {
                                        backgroundColor: '#28a745',
                                        color: 'white'
                                      } : {
                                        backgroundColor: '#f8f9fa'
                                      }
                                    }
                                    label={el.status === '' ? 'booked' : el.status}
                                  />
                                </Box>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Table>
                                  <TableBody>
                                    {
                                      el.status === 'cancelled' && (
                                        <TableRow>
                                          <TableCell align="left" />
                                          <TableCell align="right">
                                            <Button onClick={() => handleAcceptCancelBookRequest(el._id)} color="primary">
                                            Accept Cancel Request
                                            </Button>
                                          </TableCell>
                                        </TableRow>
                                      )
                                    }
                                    <TableRow>
                                      <TableCell align="left">First Name</TableCell>
                                      <TableCell align="right">{el.firstName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell align="left">Last Name</TableCell>
                                      <TableCell align="right">{el.lastName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell align="left">Phone Number</TableCell>
                                      <TableCell align="right">{el.phoneNumber}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell align="left">Address</TableCell>
                                      <TableCell align="right">{el.address}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell align="left">Date</TableCell>
                                      <TableCell align="right">{el.startDate + ' ~ ' + el.endDate}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell align="left">Description</TableCell>
                                      <TableCell align="right">{el.description}</TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </AccordionDetails>
                            </Accordion>
                          )) : (
                            <Box
                              display="flex"
                              flexDirection="row"
                              justifyContent="center"
                              alignItems="center"
                              style={{
                                width: '100%',
                                padding: '70px 0px',
                              }}
                            >
                              No book
                            </Box>
                          )
                        }
                      </Box>
                    </TabPanel>
                  )
                }
              </Grid>
            </Grid>
          </div>
        </Paper>
        <Dialog open={bookServiceDlgOpen} onClose={handleBookServiceDlgClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Book Service</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To book this service, please enter correct details here.
            </DialogContentText>
            <TextField
              variant="outlined"
              className={classes.inputService}
              label="First Name*"
              fullWidth
              onChange={handleClientInfoChange('firstName')}
              name="firstName"
              value={values.firstName}
            />
            <TextField
              variant="outlined"
              className={classes.inputService}
              label="Last Name*"
              fullWidth
              onChange={handleClientInfoChange('lastName')}
              name="lastName"
              value={values.lastName}
            />
            <TextField
              variant="outlined"
              className={classes.inputService}
              label="Phone Number*"
              fullWidth
              onChange={handleClientInfoChange('phoneNumber')}
              name="phoneNumber"
              value={values.phoneNumber}
            />
            <TextField
              variant="outlined"
              className={classes.inputService}
              label="Address*"
              fullWidth
              onChange={handleClientInfoChange('address')}
              name="address"
              value={values.address}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Start Date"
                format="MM/dd/yyyy"
                fullWidth
                value={values.startDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardDatePicker
                margin="normal"
                fullWidth
                id="date-picker-dialog1"
                label="End Date"
                format="MM/dd/yyyy"
                value={values.endDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            <TextField
              multiline
              rows="7"
              variant="outlined"
              className={classes.inputService}
              label="Description*"
              fullWidth
              onChange={handleClientInfoChange('description')}
              name="description"
              value={values.description}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleBookServiceDlgClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleBookService} color="primary">
              Book now
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={unBookConfirmDlgOpen} onClose={() => setUnBookConfirmDlgOpen(false)} aria-labelledby="form-dialog-title1">
          <DialogTitle id="form-dialog-title1">Are you sure to cancel booking?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setUnBookConfirmDlgOpen(false)} color="primary">
              No
            </Button>
            <Button onClick={handleUnBookService} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

NewRequest.propTypes = {
  // t: PropTypes.func.isRequired
};

export default withTranslation(['common'])(NewRequest);
