import * as smart from 'fhirclient';
import * as express from 'express';
import { smartSettings } from './constants';

export const questionnaireRouter = express.Router();
questionnaireRouter.route('/').get((req, res) => {
  smart(req, res)
    .init({ ...smartSettings, redirectUri: '/' })
    .then(async (client) => {
      const data = await (client.patient.id
        ? client.patient.read()
        : client.request('Questionnaire'));
      res.type('json').send(JSON.stringify(data, null, 4));
    });
}
);
questionnaireRouter.route('/').put((req, res) => {
  // smart(req, res)
  //   .init({ ...smartSettings, redirectUri: '/' })
  //   .then(async (client) => {
  //     const data = await (client.patient.id
  //       ? client.patient.read()
  //       : client.request('Questionnaire'));
  //     res.type('json').send(JSON.stringify(data, null, 4));
  //   });
});

questionnaireRouter.route('/').post((req, res) => {
  // smart(req, res)
  //   .init({ ...smartSettings, redirectUri: '/' })
  //   .then(async (client) => {
  //     const data = await (client.patient.id
  //       ? client.patient.read()
  //       : client.request('Questionnaire'));
  //     res.type('json').send(JSON.stringify(data, null, 4));
  //   });
});









