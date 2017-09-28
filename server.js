import config from './config';
import express from 'express';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import bodyParser from 'body-parser';
import apiRouter from './api';
import serverRender from './serverRender';


const server = express();

server.use(sassMiddleware({
  src: path.join(__dirname, 'src/sass'),
  dest: path.join(__dirname, 'public')
}));

server.set('view engine', 'ejs');

server.get(['/', '/contest/:contestId'], (req, res) => {
  // serverRender return promise, this is to render server side React.
  // data coming from serverRender
  serverRender(req.params.contestId)
    .then(({initialData, initialMarkup}) => {
      res.render('index', {
        initialData,
        initialMarkup
      });
    })
    .catch(error => {
      console.error(error);
      res.status(404).send('Bad Request');
    });
});

server.use(bodyParser.json());

server.use('/api', apiRouter);

server.use(express.static('public'));

server.listen(config.port, config.host, () => {
  console.info(`Express is listening on port ${config.port}`);
});
