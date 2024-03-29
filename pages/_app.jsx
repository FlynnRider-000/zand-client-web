import React from 'react';
import App, { Container } from 'next/app';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PageTransition } from 'next-page-transitions';
import Loading from 'react-loading-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { i18n, appWithTranslation } from '../i18n';
import appTheme from '../theme/appTheme';
import GradientDeco from '../components/GradientDeco';

import store from '../store';

/* import css vendors */
import '../node_modules/react-loading-bar/dist/index.css';
import '../node_modules/animate.css/animate.css';
import '../vendors/animate-extends.css';
import '../vendors/page-transition.css';

let themeType = 'light';
if (typeof Storage !== 'undefined') { // eslint-disable-line
  themeType = localStorage.getItem('luxiTheme') || 'light';
}

class MyApp extends App {
  state = {
    loading: true,
    serverChecking: true,
    theme: {
      ...appTheme('mint', themeType),
      direction: i18n.language === 'ar' ? 'rtl' : 'ltr'
    }
  }

  componentDidMount() {
    // console.log('app loaded');

    // Set layout direction
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

    // Remove preloader
    const preloader = document.getElementById('preloader');
    if (preloader !== null || undefined) {
      preloader.remove();
    }

    this.setState({ loading: true });

    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    localStorage.setItem('server_origin', 'primary');
    this.setState({ serverChecking: false });
  }

  toggleDarkTheme = () => {
    const { theme } = this.state;
    const newPaletteType = theme.palette.type === 'light' ? 'dark' : 'light';
    localStorage.setItem('luxiTheme', theme.palette.type === 'light' ? 'dark' : 'light');
    this.setState({
      theme: {
        ...appTheme('money', newPaletteType),
        direction: theme.direction,
      }
    });
  }

  toggleDirection = dir => {
    const { theme } = this.state;
    document.dir = dir;
    this.setState({
      theme: {
        ...theme,
        direction: dir,
        palette: {
          ...theme.palette
        }
      }
    });
  }

  render() {
    const { theme, loading } = this.state;
    const muiTheme = createMuiTheme(theme);
    const { Component, pageProps, router } = this.props; // eslint-disable-line
    const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
    return (
      <Container>
        <Provider store={store}>
          <PersistGate loading={null} persistor={store.__PERSISTOR}>
            <StylesProvider jss={jss}>
              <MuiThemeProvider theme={muiTheme}>
                <CssBaseline />
                <GradientDeco />
                {
                  this.state.serverChecking && (
                    <Loading
                      show={loading}
                      color={theme.palette.primary.light}
                      showSpinner={false}
                    />
                  )
                }
                <div id="main-wrap">
                  {
                    !this.state.serverChecking
                    && (
                      <PageTransition timeout={300} classNames="page-fade-transition">
                        <Component
                          {...pageProps}
                          onToggleDark={this.toggleDarkTheme}
                          onToggleDir={this.toggleDirection}
                          key={router.route}
                        />
                      </PageTransition>
                    )
                  }
                </div>
              </MuiThemeProvider>
            </StylesProvider>
          </PersistGate>
        </Provider>
      </Container>
    );
  }
}

export default appWithTranslation(MyApp);
