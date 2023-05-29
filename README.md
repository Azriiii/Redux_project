---
### A Guide to i18n in React.js: implemntation of translation module:


Due to a potentially large worldwide client base and the need for multi-language support, we have decided to implement React i18n with a decentralized approach using a JSON file for storing all the translated text. This allows for efficient management and easy updates of translations, ensuring a seamless and accessible experience for users from different regions. With React i18n, managing translations becomes effortless. You can extract translatable text, organize it in a translation file, and seamlessly switch between languages. 



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



 Fill Language-specific JSON Files with Keys, Supporting Nested Objects or Flat Structure:


```JSON

The local folder contains the JSON files for the main four languages: English (en), French (fr), Chinese (cn), and German (de). 
These JSON files include the translations for the different sections, sub-sections, each with its respective sub-sections and key-value pairs.
"navigation": {
    "error": {
      "pageNotFound": "Seite nicht gefunden!",
      "goHome": "Zur Startseite"
    }
	}


![folder](https://github.com/Azriiii/Redux_project/assets/47857678/646c0a8f-62b3-4dbe-bef4-1389fb548a57)

![json](https://github.com/Azriiii/Redux_project/assets/47857678/0fff45d8-f95e-4a61-85bc-c296618bdfed)




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



Quick demo : 

![Animation22](https://github.com/Azriiii/Redux_project/assets/47857678/7b56272d-65f5-49c0-8c4b-7b752904e718)

![cn](https://github.com/Azriiii/Redux_project/assets/47857678/ea6457e5-509a-4df4-8d40-6da32b5715dc)
![de](https://github.com/Azriiii/Redux_project/assets/47857678/a02ba2f0-7318-4bcd-9a5e-3cbc0b0b9754)



### Please be aware that depending on specific needs and context, some modifications may be required in the translations. Additionally, it is important to note that Mandarin Chinese is the commonly used language for Chinese translations.
