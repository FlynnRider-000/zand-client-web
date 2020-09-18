import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import DescriptionIcon from '@material-ui/icons/Description';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import routeLink from '../../static/text/link';
import { withTranslation } from '../../i18n';
import { useText } from '../../theme/common';
import Parallax from '../Parallax/Hexagonal';
import Decoration from './Decoration';
import useStyles from './form-style';
import useDocFormStyles from './doc-form-style';

import * as Actions from '../../store/actions/main';
import * as api from '../../api';


function NewRequest() {
  const classes = useStyles();
  const router = useRouter();
  const docFormClasses = useDocFormStyles();
  const text = useText();
  const dispatch = useDispatch();
  const [pageLoadingState, setPageLoadingState] = useState(false);
  const steps = ['Basic Information', 'Upload document', 'Finish'];
  const [activeStep, setActiveStep] = React.useState(0);
  const [showNewDoc, setShowNewDoc] = React.useState(false);
  const stepButtonLabels = ['Proceed to Upload documents', 'Finish Editing', 'Submit Request'];
  const [values, setValues] = useState({
    intendedUse: '',
    productProducedType: '',
    requestType: '',
    description: '',
    company: '',
    productName: '',
    model: '',
    priceMax: '',
    priceMin: '',
    productCategory: '',
    commission: '',
    deliveryLocation: '',
    quantity: '',
    documents: [
    ]
  });

  let docCounting = values.documents.length;
  const [newDocument, setNewDocument] = useState({
    docId: 0,
    docType: '',
    name: '',
    description: '',
    files: []
  });
  const [openNotif, setNotif] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  const [nextBtnState, setNextBtnState] = useState(true);

  const inputFileEl = useRef(null);


  const docTypes = useSelector(state => state.main.requestReducer.docTypes);
  const userData = useSelector(state => state.main.authReducer.decodedToken);
  const productCategory = useSelector(state => state.main.requestReducer.productCategories);

  useEffect(() => {
    console.log(pageLoadingState);
    if (!pageLoadingState) {
      console.log('load page data');
      dispatch(Actions.getDocTypes());
      dispatch(Actions.getAllProductCategories());
    }
  }, []);

  useEffect(() => {
    if (pageLoadingState) {
      console.log('page data loaded');
    }
  }, [pageLoadingState]);


  useEffect(() => {
    if (!pageLoadingState && docTypes.length > 0) {
      console.log(docTypes);
      setPageLoadingState(true);
    }
  }, [docTypes]);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleNewDocumentDataChange = name => event => {
    setNewDocument({ ...newDocument, [name]: event.target.value });
  };

  const checkIfDocumentAdded = (name) => {
    let i = 0;
    for (i = 0; i < values.documents.length; i += 1) {
      if (name === values.documents[i].docType) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = () => {
    setPageLoadingState(false);
    api.newRequest({ ...values, userName: userData.userName }).then((response) => {
      console.log(response);
      if (!response.success) {
        dispatch(Actions.showNotification('There are issues in submitting documents'));
        setPageLoadingState(true);
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        dispatch(Actions.showNotification('Successfully submitted.'));
        setPageLoadingState(true);
        setUploaded(2);
      }
    });
  };

  const handleClose = () => {
    setNotif(false);
  };

  const validateStep = (step) => {
    if (step === 0) {
      console.log('validate step1');
      if (values.intendedUse === '' && values.requestType === 'buy') return false;
      if (values.requestType === '') return false;
      if (values.model === '') return false;
      if (values.productName === '') return false;
      if (values.quantity === '') return false;
      if (values.priceMin === '') return false;
      if (values.productProducedType === '') return false;
      if (values.commission === '') return false;
      if (values.productCategory === '') return false;
      if (values.deliveryLocation === '') return false;
      dispatch(Actions.getDocTypes(values.requestType));
    } else if (step === 1) {
      console.log('validate step2');
      if (values.documents.length === 0) return false;
    }
    return true;
  };

  useEffect(() => {
    setNextBtnState(validateStep(activeStep));
  }, [values]);

  //= ==========STEPPER==============
  const handleNext = () => {
    console.log(activeStep);
    if (activeStep > 2) {
      router.push('/');
    }
    if (activeStep === 2) {
      handleSubmit();
    } else {
      setNextBtnState(validateStep(activeStep + 1));
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleOpenFile = () => {
    if (newDocument.files.length > 0) {
      setNewDocument({ ...newDocument, files: [] });
    } else {
      inputFileEl.current.click();
    }
  };

  const handleFileChanged = (event) => {
    const { files } = event.target;
    console.log(files);
    let i;
    const list = [];
    for (i = 0; i < files.length; i += 1) {
      list.push(files.item(i));
    }
    console.log(files);
    setNewDocument({ ...newDocument, files: list });
  };

  const handelOpenNewDocument = () => {
    console.log('open Add new');
    setNewDocument({
      docType: '',
      name: '',
      description: '',
      files: []
    });
    setShowNewDoc(true);
  };

  const saveNewDocument = () => {
    if (newDocument.name === '' || newDocument.type === '') {
      dispatch(Actions.showNotification('You must input Name and Type'));
    } else {
      let docList = {};
      docList = values.documents;
      docList.push({ ...newDocument, docId: docCounting });
      docCounting += 1;
      setValues({ ...values, documents: docList });
      setShowNewDoc(false);
      console.log(docList);
    }
  };

  const handleDeleteDocument = (index) => {
    console.log('delete: ', index);
    let docList = {};
    docList = values.documents;
    console.log(docList);
    docList.splice(index, 1);
    setValues({ ...values, documents: docList });
  };

  const _renderBaseInfoForm = () => (
    <Grid container spacing={4}>
      <Grid item md={12} xs={12}>
        <FormControlLabel name="RequestType" value="buy" control={<Radio checked={values.requestType === 'buy'} />} label="I want Buy" onChange={handleChange('requestType')} />
        <FormControlLabel name="RequestType" value="sell" control={<Radio checked={values.requestType === 'sell'} />} label="I want Sell" onChange={handleChange('requestType')} />
      </Grid>
      {
        values.requestType === 'buy'
        && (
          <Grid item md={4} xs={12}>
            <FormControl className={docFormClasses.docSelect} variant="filled">
              <InputLabel>Intended Use</InputLabel>
              <Select
                value={values.intendedUse}
                style={{ width: '100%' }}
                onChange={handleChange('intendedUse')}
              >
                <MenuItem value="hospital">Hospital</MenuItem>
                <MenuItem value="government">Goverment(restricted)</MenuItem>
                <MenuItem value="private">Private(unrestricted)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )
      }
      <Grid item md={4} xs={12}>
        <TextField
          variant="filled"
          className={classes.input}
          label="Product Name*"
          onChange={handleChange('productName')}
          name="Product"
          value={values.productName}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <TextField
          variant="filled"
          className={classes.input}
          label="Model or Type of Product*"
          onChange={handleChange('model')}
          name="Model"
          value={values.model}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <TextField
          variant="filled"
          className={classes.input}
          label="Quantity*"
          onChange={handleChange('quantity')}
          name="Quantity"
          value={values.quantity}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <FormControl className={docFormClasses.docSelect} variant="filled">
          <InputLabel>Product Exist Type*</InputLabel>
          <Select
            value={values.productProducedType}
            style={{ width: '100%' }}
            onChange={handleChange('productProducedType')}
          >
            <MenuItem value="produced">Already Produced Product</MenuItem>
            <MenuItem value="future">Future Product</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={4} xs={12}>
        <FormControl className={docFormClasses.docSelect} variant="filled">
          <InputLabel>Product Category*</InputLabel>
          <Select
            value={values.productCategory}
            style={{ width: '100%' }}
            onChange={handleChange('productCategory')}
          >
            { productCategory.filter(category => !category.isDeleted).map((category) => (
              <MenuItem key={category._id} value={category.name}>{category.name}</MenuItem>
            )) }
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={4} xs={12}>
        <TextField
          variant="filled"
          className={classes.input}
          label={values.requestType === 'sell' ? 'Price per piece*' : 'Min Price*'}
          onChange={handleChange('priceMin')}
          name="PriceMin"
          value={values.priceMin}
        />
      </Grid>
      {
        values.requestType === 'buy'
        && (
          <Grid item md={4} xs={12}>
            <TextField
              variant="filled"
              className={classes.input}
              label="Max Price*"
              onChange={handleChange('priceMax')}
              name="PriceMax"
              value={values.priceMax}
            />
          </Grid>
        )
      }
      <Grid item md={4} xs={12}>
        <TextField
          variant="filled"
          className={classes.input}
          label="Commission* (% or fixed or none)"
          onChange={handleChange('commission')}
          name="Commission"
          value={values.commission}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="filled"
          multiline
          rows="2"
          className={classes.input}
          label={values.requestType === 'sell' ? 'Stock location*' : 'Destination*'}
          onChange={handleChange('deliveryLocation')}
          name="Delivery"
          value={values.deliveryLocation}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="filled"
          multiline
          rows="6"
          className={classes.input}
          label="Write detailed description about your document."
          onChange={handleChange('description')}
          name="Description"
          value={values.description}
        />
      </Grid>
    </Grid>
  );

  const _renderDocumentTypes = () => (
    <Paper>
      <Grid container direction="row" spacing={4} justify="center">
        <Grid item md={12} sm={12} style={{ paddingBottom: '0px' }}>
          <Typography variant="h6" align="center">Required</Typography>
        </Grid>
        <Grid item md={12} sm={12} style={{ paddingTop: '0px' }}>
          <List>
            {
              docTypes.filter((docType) => docType.isRequired).map((data) => (
                <ListItem key={'doc' + data.name}>
                  <ListItemIcon>
                    {
                      checkIfDocumentAdded(data.name)
                        ? <CheckBoxIcon />
                        : <CheckBoxOutlineBlankIcon />
                    }
                  </ListItemIcon>
                  <ListItemText
                    primary={data.name}
                  />
                </ListItem>
              ))
            }
          </List>
        </Grid>
      </Grid>
    </Paper>
  );

  const _renderNewForm = () => (
    <Grid container direction="row" spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h6">Fill informations for document and upload file.</Typography>
      </Grid>
      <Grid container item md={10} direction="row" spacing={4}>
        <Grid item xs={12} md={4}>
          <FormControl className={docFormClasses.docSelect} variant="filled">
            <InputLabel>Document Type</InputLabel>
            <Select
              value={newDocument.docType}
              style={{ width: '100%' }}
              onChange={handleNewDocumentDataChange('docType')}
            >
              {
                docTypes.map((docType) => (
                  <MenuItem value={docType.name} key={'select' + docType.name}>{docType.name}</MenuItem>
                ))
              }
              <MenuItem value="other" key="selectOther">Custom</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            variant="filled"
            className={classes.input}
            label="Document Name"
            onChange={handleNewDocumentDataChange('name')}
            name="DocumentName"
            value={newDocument.name}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            variant="filled"
            multiline
            rows="6"
            className={classes.input}
            label="Write detailed description about your document."
            onChange={handleNewDocumentDataChange('description')}
            name="Description"
            value={newDocument.description}
          />
        </Grid>
      </Grid>
      <Grid container item md={2} direction="row">
        <Grid item xs={12}>
          <List>
            {
              newDocument.files.map((data) => (
                <ListItem key={'doc' + data.name}>
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={data.name}
                  />
                </ListItem>
              ))
            }
          </List>
        </Grid>
        <Grid item xs={12}>
          <input ref={inputFileEl} style={{ display: 'none' }} multiple id="upload-file" name="upload-file" type="file" onChange={handleFileChanged} />
          <Button variant="contained" color="secondary" size="large" onClick={handleOpenFile}>
            {
              newDocument.files.length === 0 ? 'Upload' : 'Cancel'
            }
          </Button>
        </Grid>
      </Grid>
      <Grid container item md={12} justify="space-between" style={{ borderTop: '1px solid gray' }}>
        <Button variant="contained" color="primary" size="large" onClick={saveNewDocument}>
          Save Document
        </Button>
        <Button variant="contained" size="large" onClick={() => { setShowNewDoc(false); }}>
          Cancel
        </Button>
      </Grid>
    </Grid>
  );

  const _renderDocument = (data, key) => (
    <Grid item md={12} xs={12} key={key + '-docitem'}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container>
            <Grid item md={3}>
              <Typography variant="subtitle1">{data.name}</Typography>
            </Grid>
            <Grid item md={3}>
              <Typography variant="subtitle1">{'(' + data.docType + ')'}</Typography>
            </Grid>
            <Grid item md={3}>
              <Typography variant="subtitle1">{'File Count:' + data.files.length}</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{data.description}</Typography>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small" onClick={() => { handleDeleteDocument(key); }}>Delete</Button>
        </AccordionActions>
      </Accordion>
    </Grid>
  );

  const _renderDocumentList = () => (
    <Grid container spacing={4}>
      {
        values.documents.map((doc, index) => (
          _renderDocument(doc, index)
        ))
      }
    </Grid>
  );

  const _renderDocumentListContainer = () => (
    <Grid container spacing={4}>
      <Grid item md={12} xs={12}>
        {
          values.documents.length === 0
            ? <Typography variant="h6">There are no document, please start to add.</Typography>
            : _renderDocumentList()
        }
        {/* <Button variant="contained" color="primary" size="large" onClick={() => { setShowNewDoc(true); }}>
          Add New Document
        </Button> */}
      </Grid>
    </Grid>
  );

  const _renderFinished = () => (
    <Grid container spacing={4}>
      <Grid item md={8} sm={12} style={{ borderRight: '1px solid gray', borderLeft: '1px solid gray' }}>
        <Grid container spacing={4}>
          <Grid item md={3}>
            <Typography className={docFormClasses.finishedDocFieldName}>Request Type:</Typography>
          </Grid>
          <Grid item md={9}>
            <Typography className={docFormClasses.finishedDocFieldValue}>{values.requestType}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item md={3}>
            <Typography className={docFormClasses.finishedDocFieldName}>Product Name:</Typography>
          </Grid>
          <Grid item md={9}>
            <Typography className={docFormClasses.finishedDocFieldValue}>{values.productName}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item md={3}>
            <Typography className={docFormClasses.finishedDocFieldName}>Product Model:</Typography>
          </Grid>
          <Grid item md={9}>
            <Typography className={docFormClasses.finishedDocFieldValue}>{values.model}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item md={3}>
            <Typography className={docFormClasses.finishedDocFieldName}>Quantity:</Typography>
          </Grid>
          <Grid item md={9}>
            <Typography className={docFormClasses.finishedDocFieldValue}>{values.quantity}</Typography>
          </Grid>
        </Grid>
        {
          values.type === 'buy'
            ? (
              <Grid container spacing={4}>
                <Grid item md={3}>
                  <Typography className={docFormClasses.finishedDocFieldName}>Price:</Typography>
                </Grid>
                <Grid item md={9}>
                  <Typography className={docFormClasses.finishedDocFieldValue}>{'$' + values.priceMin + ' ~ $' + values.priceMax}</Typography>
                </Grid>
              </Grid>
            )
            : (
              <Grid container spacing={4}>
                <Grid item md={3}>
                  <Typography className={docFormClasses.finishedDocFieldName}>Price:</Typography>
                </Grid>
                <Grid item md={9}>
                  <Typography className={docFormClasses.finishedDocFieldValue}>{'$' + values.priceMin}</Typography>
                </Grid>
              </Grid>
            )
        }
        <Grid container spacing={4}>
          <Grid item md={3}>
            <Typography className={docFormClasses.finishedDocFieldName}>Commission:</Typography>
          </Grid>
          <Grid item md={9}>
            <Typography className={docFormClasses.finishedDocFieldValue}>{values.commission}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item md={3}>
            <Typography className={docFormClasses.finishedDocFieldName}>Delivery Location:</Typography>
          </Grid>
          <Grid item md={9}>
            <Typography className={docFormClasses.finishedDocFieldValue}>{values.deliveryLocation}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item md={3}>
            <Typography className={docFormClasses.finishedDocFieldName}>Additional info:</Typography>
          </Grid>
          <Grid item md={9}>
            <Typography className={docFormClasses.finishedDocFieldValue}>{values.description}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4} sm={12} style={{ borderRight: '1px solid gray' }}>
        {
          values.documents.map((doc) => (
            <Grid container spacing={4} key={doc.docId}>
              <Grid item md={1}>
                <DescriptionIcon />
              </Grid>
              <Grid item md={11}>
                <Typography>{doc.name + ' (' + doc.docType + ') : ' + doc.files.length + 'files'}</Typography>
              </Grid>
            </Grid>
          ))
        }
      </Grid>
    </Grid>
  );

  const _renderSuccess = () => (
    <Grid container spacing={4}>
      <Grid item md={12} container justify="center">
        <CheckCircleOutlineIcon color="primary" style={{ fontSize: 50 }} />
      </Grid>
      <Grid item md={12} contaier justify="center">
        <Typography variant="h6" style={{ textAlign: 'center' }}>Successfully Submitted.</Typography>
      </Grid>
    </Grid>
  );

  const _renderDocuments = () => (
    <Grid container spacing={4}>
      <Grid item lg={3} md={4} sm={12}>
        { _renderDocumentTypes() }
      </Grid>
      <Grid item lg={9} md={8} sm={12}>
        {
          !showNewDoc
            ? (
              <Grid container direction="row" spacing={4}>
                <Grid item md={12}>
                  <Button variant="contained" color="primary" size="large" onClick={() => { handelOpenNewDocument(); }}>
                  Add New Document
                  </Button>
                </Grid>
                <Grid item md={12}>
                  <Paper style={{ padding: '20px' }}>
                    { _renderDocumentListContainer() }
                  </Paper>
                </Grid>
              </Grid>
            )
            : (
              <Grid item md={12}>
                <Paper style={{ padding: '20px' }}>
                  { showNewDoc && _renderNewForm() }
                </Paper>
              </Grid>
            )
        }
      </Grid>
    </Grid>
  );

  const _renderForm = () => {
    if (!pageLoadingState) {
      return (
        <div>
          <CircularProgress />
        </div>
      );
    }
    return (
      <div>
        {
          activeStep === 0
          && (
            _renderBaseInfoForm()
          )
        }
        {
          activeStep === 1
          && (
            _renderDocuments()
          )
        }
        {
          activeStep === 2
          && (
            _renderFinished()
          )
        }
        {
          activeStep === 3
          && (
            _renderSuccess()
          )
        }
      </div>
    );
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
        <IconButton href={routeLink.crypto.home} className={clsx(classes.backtohome, classes.invert)}>
          <i className="ion-ios-home" />
          <i className="ion-ios-arrow-thin-left" />
        </IconButton>
        <Paper className={clsx(classes.formBox, 'fragment-fadeUp')}>
          <div className={classes.fullFromWrap}>
            <Typography
              variant="h3"
              align="center"
              className={clsx(classes.title, text.title)}
              gutterBottom
            >
              Say What You Want to Us
            </Typography>
            <Typography className={clsx(classes.desc, text.subtitle2)}>
              Please input valid information so that we can support you :)
            </Typography>
            <Stepper activeStep={activeStep}>
              {steps.map((label) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <div className={classes.form}>
              { _renderForm() }
              <div className={clsx(classes.btnArea, classes.flex)}>
                {
                  activeStep !== 0 && uploaded === 0
                  && (
                    <Button variant="contained" size="large" onClick={handleBack}>
                      Back
                    </Button>
                  )
                }
                {
                  uploaded === 0
                    ? (
                      <Button variant="contained" color="secondary" size="large" onClick={handleNext} disabled={!nextBtnState}>
                        {stepButtonLabels[activeStep]}
                      </Button>
                    )
                    : (
                      <Button variant="contained" color="secondary" size="large" onClick={handleNext}>
                        Go to Main Page
                      </Button>
                    )
                }
              </div>
            </div>
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
