/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    '& .slide': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'white !important'
    }
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    justifyContent: 'center',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  scrollable: {
    overflowX: 'auto',
    width: '100%',
    display: '-webkit-inline-box',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    maxHeight: 400,
    '&::-webkit-scrollbar': {
      width: '0.6em',
      height: '0.6em',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.9)',
      backgroundColor: 'white',
      borderRadius: 10,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#157AC2',
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.9)',
      borderRadius: 10,
      outline: '1px solid slategrey',
    }
  },
}));

const ImageView = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.tileData && (
        <Carousel
          width="100%"
          showArrows
          showStatus={false}
          showThumbs={false}
          infiniteLoop
          useKeyboardArrows
          autoPlay
          swipeable
          swipeScrollTolerance={5}
          emulateTouch
        >
          {props.tileData.map(tile => (
            <div key={tile._id} className={classes.imgArea}>
              <img src={tile.img} alt={tile.title} />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

ImageView.propTypes = {
  tileData: PropTypes.array.isRequired
};

export default ImageView;
