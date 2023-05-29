---
### A Guide to i18n in React.js

Due to a possible large client wordlwide base and the need for multi-language support, we have decided to implement React i18n with a decentralized approach using a JSON file for storing all the translated text. This allows for efficient management and easy updates of translations, ensuring a seamless and accessible experience for users from different regions. With React i18n, managing translations becomes effortless. You can extract translatable text, organize it in a translation file, and seamlessly switch between languages. 

### Getting Started with React i18n: Installation Guide:

`npm install react-i18next i18next --save`



The locales folder contains a JSON file for each language you support. 

### Configuration:

 The provided code initializes the i18n library and loads translations for different languages in a React application
```js

// import required dependencies
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// import JSON files containing translations for different languages
import deLocales from './de.json';
import enLocales from './en.json';
import frLocales from './fr.json';
import cnLocales from './cn.json';

// Initialize i18n with configuration options
i18n
  .use(LanguageDetector) // use language detector to automatically detect user's language
  .use(initReactI18next) // initialize i18next for React components
  .init({
    resources: {
      // Define language-specific translations using JSON files
      en: { translations: enLocales }, 
      de: { translations: deLocales }, 
      fr: { translations: frLocales }, 
      cn: { translations: cnLocales } 
    },
    lng: localStorage.getItem('i18nextLng') || 'en', // set initial language based on stored preference or default to english
    fallbackLng: 'en', // fallback language if translation is not available
    debug: false, // disable debug mode
    ns: ['translations'], // namespace for translations
    defaultNS: 'translations', // default namespace for translations
    interpolation: {
      escapeValue: false // disable escaping of HTML entities in translated text
    }
  });

export default i18n; // export the initialized i18n object for use in the application


```




To effectively initialize react-i18next, import that config file in your app entry point:
```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './i18n/config'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```


 Fill Language-specific JSON Files with Keys, Supporting Nested Objects or Flat Structure:


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

import Page from '../components/Page';
import useLocales from '../hooks/useLocales';

export default function Page404() {
  const { translate } = useLocales(); // use the useLocales hook to access the translation function

  return (
    <Page title={translate('navigation.error.pageNotFound')}>
      <RootStyle>
        <Container component={MotionContainer}>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <m.div variants={varBounce().in}>
              <Typography variant="h3" paragraph>
                {translate('navigation.error.pageNotFound')}
              </Typography>
            </m.div>

            <Button to="/" size="large" variant="contained" component={RouterLink}>
              {translate('navigation.error.goHome')}
            </Button>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}

```

Quick demo : 

![Animation22](https://github.com/Azriiii/Redux_project/assets/47857678/5dd901d4-4d13-4559-bee6-7a6b99a97217)

![cn](https://github.com/Azriiii/Redux_project/assets/47857678/71e9338e-9325-4c5f-a059-ebcfa1f886ee)

![de](https://github.com/Azriiii/Redux_project/assets/47857678/d9a9cb91-1647-4d67-b437-f2f887258e97)


### Please be aware that depending on specific needs and context, some modifications may be required in the translations. Additionally, it is important to note that Mandarin Chinese is the commonly used language for Chinese translations.
