const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`);
});
