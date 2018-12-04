// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `index.ts`, but if you do
// `ng build --env=prod` then `index.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const AppConfig = {
  production: false,
  environment: 'DEV',
  firebase: {
    apiKey: 'AIzaSyCp26XjTepOq2sZC9z9vFiw85dA_qTW4gc',
    authDomain: 'yea-project-27c5d.firebaseapp.com',
    databaseURL: 'https://yea-project-27c5d.firebaseio.com',
    projectId: 'yea-project-27c5d',
    storageBucket: 'yea-project-27c5d.appspot.com',
    messagingSenderId: '776409342660'
  }
};
