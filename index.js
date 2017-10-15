require('babel-core/register');
const app = require('./src/app/index').default;
app.listen(9090);