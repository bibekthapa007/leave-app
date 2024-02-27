import App from 'app';
import config from 'config';
import route from 'route';

import { connectToDatabase } from './db';

const port = config.app.port;

const server = new App(route);

server.app.use(connectToDatabase);

server.listen(port);
