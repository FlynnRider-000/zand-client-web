import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ScriptTag from 'react-script-tag';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useText } from '../../theme/common';
import { withTranslation } from '../../i18n';
import useStyles from './banner-style';
import * as api from '../../api';
import * as actionNotification from '../../store/actions/main/notification.actions';
import config from '../../api/config';

function Banner(props) {
  const router = useRouter();
  const classes = useStyles();
  const text = useText();
  const dispatch = useDispatch();
  const elem = useRef(null);
  const signInState = useSelector(state => state.main.authReducer.state);

  const { t } = props;

  const [hide, setHide] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const handleScroll = () => {
    if (!elem.current) {
      return;
    }
    const doc = document.documentElement;
    const elTop = elem.current.offsetTop - 200;
    const elBottom = elTop + elem.current.getBoundingClientRect().height;
    if (doc.scrollTop > elTop && doc.scrollTop < elBottom) {
      setHide(false);
    } else {
      setHide(true);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/static/scripts/particles.min.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    api.getHomePage().then((res) => {
      if (res.data.success === true) {
        const resObj = res.data.data;
        for (let i = 0; i < resObj.length; i += 1) {
          if (resObj[i].item === 'title') setTitle(resObj[i].itemContent);
          if (resObj[i].item === 'content') setContent(resObj[i].itemContent);
          if (resObj[i].item === 'image') setImage(resObj[i].itemContent);
        }
      } else {
        dispatch(actionNotification.showNotification('Something went wrong.'));
      }
    });
  }, []);

  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS('particles_backgrond', {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#ffffff'
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000'
            },
            polygon: {
              nb_sides: 5
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'repulse'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      });
      window.addEventListener('scroll', handleScroll);
    }
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  const addNew = () => {
    if (signInState === '') {
      router.push('/login');
    } else {
      router.push('/add-new');
    }
  };

  return (
    <div className={classes.root} ref={elem}>
      <ScriptTag type="text/javascript" src="/static/scripts/particles.min.js" />
      <div className={classes.canvasWrap}>
        <div className={classes.overlay}>
          <div className={clsx(classes.decoInner, hide && classes.hide)}>
            <div id="particles_backgrond" className={classes.particleBackground} />
          </div>
        </div>
      </div>
      <Container fixed>
        <div className={classes.bannerWrap}>
          <Grid container alignItems="center" spacing={6}>
            <Grid item xs={12} md={8}>
              <div className={classes.text}>
                <Typography variant="h4" className={text.title2}>
                  {title}
                </Typography>
                <Typography component="p" className={text.subtitle2}>
                  {content}
                </Typography>
              </div>
              <div className={classes.btnArea}>
                <Button variant="contained" color="secondary" size="large" onClick={() => router.push('/get-started')}>
                  {t('crypto-landing:banner_getstarted')}
                </Button>
                <Button variant="outlined" onClick={addNew} className={classes.invert} size="large">
                  Add New Commodity Request
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <figure className={classes.objectArt}>
                <img src={image === '' ? '/static/images/crypto/banner-art.png' : config().serverUrl + image} alt="illustration" />
              </figure>
            </Grid>
          </Grid>
        </div>
      </Container>
      <div className={classes.decoBottom}>
        <svg>
          <use xlinkHref="/static/images/crypto/deco-banner.svg#main" />
        </svg>
      </div>
    </div>
  );
}

Banner.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['common', 'crypto-landing'])(Banner);
