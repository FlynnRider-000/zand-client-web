/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { CardActionArea, CardActions } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { RibbonContainer, RightCornerLargeRibbon } from '../ReactRibbon/ReactRibbons';
import config from '../../api/config';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  mediaArea: {
    transition: 'transform .5s',
    '&:hover': {
      transform: 'scale(1.2)'
    }
  }
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();

  const imageUrl = props.imageUrl ? config().serverUrl + props.imageUrl : '/static/images/no-product-image.png';

  return (
    <Box p={2} style={{ display: 'flex' }}>
      <RibbonContainer className="custom-class">
        <Card className={classes.root} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ maxHeight: 200, overflow: 'hidden' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Product Image"
                height="200"
                image={imageUrl}
                title="Product Image"
                className={classes.mediaArea}
              />
            </CardActionArea>
          </div>
          <Divider />
          <CardContent style={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" component="h2" style={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>
              {props.req.productName}
            </Typography>
            <div style={{ display: 'flex', paddingTop: 10 }}>
              <Typography className={classes.heading}>Quantity</Typography>
              <Typography className={classes.secondaryHeading}>{props.req.quantity}</Typography>
            </div>
            <div style={{ display: 'flex', paddingTop: 10 }}>
              <Typography className={classes.heading}>Price</Typography>
              <Typography className={classes.secondaryHeading}>
                { props.req.requestType === 0 ? (props.req.priceMin + ' ~ ' + props.req.priceMax) : props.req.priceMin}
              </Typography>
            </div>
          </CardContent>
          <CardActions style={{ diplay: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button fullWidth size="small" color="primary" endIcon={<NavigateNextIcon />} onClick={() => props.onClick()}>
              View
            </Button>
          </CardActions>
        </Card>
        <RightCornerLargeRibbon backgroundColor={props.req.productStatus === 'Sold' ? '#cc0000' : props.req.productStatus === 'Bought' ? '#448812' : '#0088ff'} color="#f0f0f0" fontFamily="Arial">
          {props.req.productStatus ? props.req.productStatus : 'New'}
        </RightCornerLargeRibbon>
      </RibbonContainer>
    </Box>
  );
}
