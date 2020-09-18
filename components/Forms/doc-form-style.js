import { makeStyles } from '@material-ui/core/styles';

const contactStyles = makeStyles(() => ({
  docSelect: {
    minWidth: 100,
    width: '100%'
  },
  finishedDocFieldName: {
    textAlign: 'right'
  },
  finishedDocFieldValue: {
    textAlign: 'left'
  }
}));

export default contactStyles;
