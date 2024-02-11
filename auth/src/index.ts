import App from 'app';
import route from 'route';
import config from 'config';

const port = config.app.port;

const app = new App(route);

app.listen(port);
