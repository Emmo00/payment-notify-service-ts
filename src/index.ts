import app from './app';
import config from './config/config';

const server = app.listen(Number(config.port), () => {
  console.log(`server started on port ${config.port}...`);
});

process.on('SIGTERM', () => {
  console.log('stopping server...');
  server.close((err) => {
    console.error(err);
    process.exit(err ? 1 : 0);
  });
});
