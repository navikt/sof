import * as smart from 'fhirclient';
import * as session from 'express-session';
import * as express from 'express';
import { questionnaireRouter } from './routers/questionnaire';

const app = express();
const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost' + port + '/api');
});

//Settings for our own server
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
  })
);

//Redirecting all get-requests regarding questionnaires to the QuestionnaireRouter
app.use('/api/Questionnaire', questionnaireRouter);
server.on('error', console.error);
