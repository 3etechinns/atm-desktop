// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `index.ts`, but if you do
// `ng build --env=prod` then `index.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const AppConfig = {
  production: false,
  environment: 'DEV',
  firebase: {
    apiKey: 'AIzaSyCZaNrfr3dsRF-yTaA5iHU0vELjbu8-gWs',
    authDomain: 'atmfinder-6c915.firebaseapp.com',
    databaseURL: 'https://atmfinder-6c915.firebaseio.com',
    projectId: 'atmfinder-6c915',
    storageBucket: 'atmfinder-6c915.appspot.com',
    messagingSenderId: '9956651539'
  }
};
