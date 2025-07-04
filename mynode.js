const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({path: 'src/.env'}); ;

const envFile = `export const environment = {
    GOOGLE_CLIENT_ID: '${process.env.GOOGLE_CLIENT_ID}',
    REDIRECT_URI: '${process.env.REDIRECT_URI}',
    BACKEND_URL: '${process.env.BACKEND_URL}'
};
`;
const targetPath = path.join(__dirname, './src/environments/environment.prod.ts');
fs.writeFile(targetPath, envFile, (err) => {
    if (err) {
        console.error(err);
        throw err;
    } else {
        console.log(successColor, `${checkSign} Successfully generated environments.prod.ts`);
    }
});