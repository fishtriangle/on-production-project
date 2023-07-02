const fs = require('fs');
const https = require('https');
const path = require('path');

const cors = require('cors');
const jsonServer = require('json-server');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

const options = {
  key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
};

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
// server.use(async (req, res, next) => {
//   await new Promise((res) => {
//     setTimeout(res, 800);
//   });
//   next();
// });

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

const corsOptions = {
  origin: ['http://localhost:3000', 'http://[::1]:3000'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// server.options('*', cors(corsOptions), (req, res) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Headers', '*');
//
//   return res;
// });

server.use(cors(corsOptions));
server.options('*', cors(corsOptions));

// Эндпоинт для логина
server.post('/login', cors(corsOptions), (req, res) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  // res.header('Access-Control-Allow-Headers', '*');
  try {
    const { username, password } = req.body;
    const db = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
    );
    const { users = [] } = db;

    const userFromBd = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (userFromBd) {
      return res.json(userFromBd);
    }

    return res.status(403).json({ message: 'User not found' });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
server.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'AUTH ERROR' });
  }

  next();
});

server.use(router);

const httpsServer = https.createServer(options, server);

// запуск сервера
httpsServer.listen(443, () => {
  // eslint-disable-next-line no-console
  console.log('server is running on 443 port');
});
