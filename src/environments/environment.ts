// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyA7gZynlvzLFuvxNmybZH-0XJjzjb5V8DE',
        authDomain: 'http-angularproject.firebaseapp.com',
        databaseURL: 'https://http-angularproject.firebaseio.com',
        projectId: 'http-angularproject',
        storageBucket: 'http-angularproject.appspot.com',
        messagingSenderId: '784425019545'
    }
};
