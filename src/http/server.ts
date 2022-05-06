import express from 'express';
import { routes } from './routes';

export const app = express();

const config = {
  apiVersion: process.env.API_VERSION ? `/${process.env.API_VERSION}` : '/v1',
  httpPort: process.env.PORT || 3000,

  httpOnReady() {
    console.log(`Server started in ${config.httpPort}.`);
    console.log(`API Version: ${config.apiVersion}`);
  },
};

app.use(config.apiVersion, routes);

process.on('uncaughtException', (error, origin) => {
  console.log(`última camada de excessão. `);
  console.log(error);
});

app.listen(config.httpPort, config.httpOnReady);
