import 'dotenv/config';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import { Service } from './service';
import { mongoConnection } from './dbconfig';
import { validateRequest } from './validator';
import { schema } from './joi-schemas';

const app = express();
const port = process.env.PORT || 3000;
mongoConnection.initMongo();

app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.send(new Service().helloFromService())
});

app.post('/feedback', async (req: Request, res: Response) => {
  const { error } = validateRequest(req.body, schema.feedback);
  if (error) {
    res.status(400).send({ message: 'Bad Request', data: error.details, statusCode: 400 });
    return;
  }
  const service = new Service();
  const response = await service.dumpData(req.body);
  res.send({ message: 'Data inserted', data: response, statusCode: 200 })
})

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port}`);
});