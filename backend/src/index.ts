import * as express from 'express';
import nuggets from './routes/nuggets-routes';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/requests', (req, res) => {
  console.log(req.body);
  res.status(201).json('all ok');
});

app.use('/api/nuggets', nuggets);

app.listen(8080, () => {
  console.log('Server is running on port 8080 🚀');
});
