const config: { port?: number } = {};
if (process.env.NODE_ENV === 'development') {
  config.port = 3000;
}

if (process.env.NODE_ENV === 'production') {
  config.port = 80;
}

export default config;
