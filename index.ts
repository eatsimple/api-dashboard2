import express from 'express';
import mainRoutes from './src/routes/mainRoutes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app: express.Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

app.use(mainRoutes);

app.listen(5000, () => {
  console.log('running OK');
});
