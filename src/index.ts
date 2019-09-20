import bodyParser from 'body-parser';
import { ENV } from './config';

import auth from './middlewares/authjwt';
import app from './app';

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, JWT_ENCRYPTION } = ENV;

app.express.use(bodyParser.json());
app.express.use(bodyParser.urlencoded({ extended: true })); // for parsing form data
app.express.use(auth(JWT_ENCRYPTION));

app.connectDB(DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME);
app.start(4000);