### A Guide to i18n in React.js


React i18n is a handy tool for translating and localizing React applications. It simplifies the process of making your app accessible to users from different languages and cultures. With React i18n, managing translations becomes effortless. You can extract translatable text, organize it in a translation file, and seamlessly switch between languages. 

### Getting Started with React i18n: Installation Guide:

`npm install react-i18next i18next --save



The locales folder contains a JSON file for each language you support. 

### Configuration:

└── src
    ├── App.tsx
    ├── i18n
    │   ├── config.ts
    │   └── locales
    │       ├── en-Us.json
    │       └── fr-FR.json
    │		├── cn-CN.json
    │		├── de-DE.json
    └── index.tsx
 
---



```js

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import deLocales from './de.json';
import enLocales from './en.json';
import frLocales from './fr.json';
import cnLocales from './cn.json';



i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: enLocales },
      de: { translations: deLocales },
      fr: { translations: frLocales },
      cn: { translations: cnLocales }

    },
    lng: localStorage.getItem('i18nextLng') || 'en',
    fallbackLng: 'en',
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

```




To effectively initialize react-i18next, import that config file in your app entry point:
```js
// highlight
import './utils/highlight';

// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
import 'react-image-lightbox/style.css';

// map

// slick-carousel
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
// @mui
// redux
import { persistor, store } from './redux/store';
// contexts
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
import { SettingsProvider } from './contexts/SettingsContext';

import { AuthProvider } from './contexts/JWTContext';
import './locales/i18n';
//
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// ----------------------------------------------------------------------
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <AuthProvider>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SettingsProvider>
            <CollapseDrawerProvider>
              {/* to be removed */}
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </CollapseDrawerProvider>
          </SettingsProvider>
        </PersistGate>
      </ReduxProvider>
    </HelmetProvider>
  </AuthProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```js


### Making Translations Ready for Your Code: Fill Language-specific JSON Files with Keys, Supporting Nested Objects or Flat Structure:


```JSON


"navigation": {
    "error": {
      "pageNotFound": "Seite nicht gefunden!",
      "goHome": "Zur Startseite"
    }
	}
```



react-i18next exposes hooks & components in order to use your translations.

The useTranslation hook is the main one you can use to replace hardcoded text with dynamic references to your translations based on current language.



```js
import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MotionContainer, varBounce } from '../components/animate';
import Page from '../components/Page';
import useLocales from '../hooks/useLocales';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));


export default function Page404() {
  const { translate } = useLocales();

  return (
    <Page title={translate('navigation.error.pageNotFound')
    } sx={{ height: 1 }}>
      <RootStyle>
        <Container component={MotionContainer}>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <m.div variants={varBounce().in}>
              <Typography variant="h3" paragraph>
                {translate('navigation.error.pageNotFound')
                }              </Typography>
            </m.div>

            <Button to="/" size="large" variant="contained" component={RouterLink}>
              {translate('navigation.error.goHome')
              }            </Button>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}

```js




### Please be aware that depending on specific needs and context, some modifications may be required in the translations. Additionally, it is important to note that Mandarin Chinese is the commonly used language for Chinese translations.
