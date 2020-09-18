import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './ReactRibbons_css';

export const RibbonContainer = ({ children, className }) => {
  const classes = useStyles();
  return (
    <div className={`${classes.ribbonContainer} ${className || ''}`}>
      {children}
    </div>
  );
};

RibbonContainer.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string
};

RibbonContainer.defaultProps = {
  className: undefined
};

export const RightCornerRibbon = ({
  children, backgroundColor, color, fontFamily
}) => {
  const classes = useStyles();
  return (
    <div className={classes.rightCornerRibbon}>
      <svg height="70" width="70">
        <polygon points="0 0, 0 10, 10 10" fill={`${backgroundColor}77`} strokeWidth="0" />
        <polygon points="0 0, 70 70, 70 40, 30 0" fill={backgroundColor} strokeWidth="0" />
        <polygon points="60 60, 60 70, 70 70" fill={`${backgroundColor}77`} strokeWidth="0" />
      </svg>
      <span style={{ color, fontFamily }} className={classes.rightCornerRibbonText}>{children}</span>
    </div>
  );
};

RightCornerRibbon.propTypes = {
  children: PropTypes.any.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fontFamily: PropTypes.string
};

RightCornerRibbon.defaultProps = {
  fontFamily: 'Arial'
};

export const RightCornerLargeRibbon = ({
  children, backgroundColor, color, fontFamily
}) => {
  const classes = useStyles();
  return (
    <div className={classes.rightCornerLargeRibbon}>
      <svg height="84" width="84">
        <polygon points="0 0, 0 12, 12 12" fill={`${backgroundColor}77`} strokeWidth="0" />
        <polygon points="0 0, 84 84, 84 48, 36 0" fill={backgroundColor} strokeWidth="0" />
        <polygon points="72 72, 72 84, 84 84" fill={`${backgroundColor}77`} strokeWidth="0" />
      </svg>
      <span style={{ color, fontFamily }} className={classes.rightCornerLargeRibbonText}>{children}</span>
    </div>
  );
};

RightCornerLargeRibbon.propTypes = {
  children: PropTypes.any.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fontFamily: PropTypes.string
};

RightCornerLargeRibbon.defaultProps = {
  fontFamily: 'Arial'
};

export const LeftCornerRibbon = ({
  children, backgroundColor, color, fontFamily
}) => {
  const classes = useStyles();
  return (
    <div className={classes.leftCornerRibbon}>
      <svg height="70" width="70">
        <g transform="rotate(-90, 35, 35)">
          <polygon points="0 0, 0 10, 10 10" fill={`${backgroundColor}77`} strokeWidth="0" />
          <polygon points="0 0, 70 70, 70 40, 30 0" fill={backgroundColor} strokeWidth="0" />
          <polygon points="60 60, 60 70, 70 70" fill={`${backgroundColor}77`} strokeWidth="0" />
        </g>
      </svg>
      <span style={{ color, fontFamily }} className={classes.leftCornerRibbonText}>{children}</span>
    </div>
  );
};

LeftCornerRibbon.propTypes = {
  children: PropTypes.any.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fontFamily: PropTypes.string
};

LeftCornerRibbon.defaultProps = {
  fontFamily: 'Arial'
};

export const LeftCornerLargeRibbon = ({
  children, backgroundColor, color, fontFamily
}) => {
  const classes = useStyles();
  return (
    <div className={classes.leftCornerLargeRibbon}>
      <svg height="84" width="84">
        <g transform="rotate(-90, 42, 42)">
          <polygon points="0 0, 0 12, 12 12" fill={`${backgroundColor}77`} strokeWidth="0" />
          <polygon points="0 0, 84 84, 84 48, 36 0" fill={backgroundColor} strokeWidth="0" />
          <polygon points="72 72, 72 84, 84 84" fill={`${backgroundColor}77`} strokeWidth="0" />
        </g>
      </svg>
      <span style={{ color, fontFamily }} className={classes.leftCornerLargeRibbonText}>{children}</span>
    </div>
  );
};

LeftCornerLargeRibbon.propTypes = {
  children: PropTypes.any.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fontFamily: PropTypes.string
};

LeftCornerLargeRibbon.defaultProps = {
  fontFamily: 'Arial'
};

export const RightRibbon = ({
  children, backgroundColor, color, fontFamily
}) => {
  const classes = useStyles();
  return (
    <div className={classes.rightRibbon}>
      <svg height="40" width="70">
        <polygon points="0 10, 10 20, 0 30, 70 30, 70 10" fill={backgroundColor} strokeWidth="0" />
        <polygon points="60 40, 60 30, 70 30" fill={`${backgroundColor}77`} strokeWidth="0" />
      </svg>
      <span style={{ color, fontFamily }} className={classes.rightRibbonText}>{children}</span>
    </div>
  );
};
RightRibbon.propTypes = {
  children: PropTypes.any.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fontFamily: PropTypes.string
};

RightRibbon.defaultProps = {
  fontFamily: 'Arial'
};

export const RightLargeRibbon = ({
  children, backgroundColor, color, fontFamily
}) => {
  const classes = useStyles();
  return (
    <div className={classes.rightLargeRibbon}>
      <svg height="60" width="90">
        <polygon points="0 15, 15 30, 0 45, 90 45, 90 15" fill={backgroundColor} strokeWidth="0" />
        <polygon points="75 60, 75 40, 90 45" fill={`${backgroundColor}77`} strokeWidth="0" />
      </svg>
      <span style={{ color, fontFamily }} className={classes.rightLargeRibbonText}>{children}</span>
    </div>
  );
};
RightLargeRibbon.propTypes = {
  children: PropTypes.any.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fontFamily: PropTypes.string
};

RightLargeRibbon.defaultProps = {
  fontFamily: 'Arial'
};

export const LeftRibbon = ({
  children, backgroundColor, color, fontFamily
}) => {
  const classes = useStyles();
  return (
    <div className={classes.leftRibbon}>
      <svg height="40" width="70">
        <g transform="scale(-1,1) translate(-70, 0)">
          <polygon points="0 10, 10 20, 0 30, 70 30, 70 10" fill={backgroundColor} strokeWidth="0" />
          <polygon points="60 40, 60 30, 70 30" fill={`${backgroundColor}77`} strokeWidth="0" />
        </g>
      </svg>
      <span style={{ color, fontFamily }} className={classes.leftRibbonText}>{children}</span>
    </div>
  );
};

LeftRibbon.propTypes = {
  children: PropTypes.any.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fontFamily: PropTypes.string
};

LeftRibbon.defaultProps = {
  fontFamily: 'Arial'
};

export const LeftLargeRibbon = ({
  children, backgroundColor, color, fontFamily
}) => {
  const classes = useStyles();
  return (
    <div className={classes.leftLargeRibbon}>
      <svg height="60" width="90">
        <g transform="scale(-1,1) translate(-90, 0)">
          <polygon points="0 15, 15 30, 0 45, 90 45, 90 15" fill={backgroundColor} strokeWidth="0" />
          <polygon points="75 60, 75 40, 90 45" fill={`${backgroundColor}77`} strokeWidth="0" />
        </g>
      </svg>
      <span style={{ color, fontFamily }} className={classes.leftLargeRibbonText}>{children}</span>
    </div>
  );
};

LeftLargeRibbon.propTypes = {
  children: PropTypes.any.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fontFamily: PropTypes.string
};

LeftLargeRibbon.defaultProps = {
  fontFamily: 'Arial'
};
