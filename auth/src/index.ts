import App from 'app';
import config from 'config';
import route from 'route';

const port = config.app.port;

const app = new App(route);

app.listen(port);
