import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import dotenv from 'dotenv';
import { db } from './db';
import routes from './routes';
import { authorization } from './middlewares/authorization';

dotenv.config();

const port = process.env.PORT || 5001;
const isDevelopment = process.env.NODE_ENV === 'development';

const certificateIsExist = isDevelopment && fs.existsSync('api/src/certificate/server.key') && fs.existsSync('api/src/certificate/server.cert');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: isDevelopment ? 'https://local.ya-praktikum.tech:5000' : 'https://new-york-nyma-01.ya-praktikum.tech' }));
app.use(authorization);

app.use('/api', routes);

(async () => {
  await db.connect();

  if (certificateIsExist) {
    https.createServer({
      key: fs.readFileSync('api/src/certificate/server.key'),
      cert: fs.readFileSync('api/src/certificate/server.cert'),
    }, app)
      .listen(port, () => {
        // eslint-disable-next-line no-console
        console.log('Application is started on localhost HTTPS:', port);
      });
  } else {
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log('Application is started on localhost HTTP:', port);
    });
  }
})();
