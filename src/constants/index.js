const ENVIRONMENTS = {
  'localhost': 'dev',
  '192.168.17.183': 'dev',
  '0.0.0.0': 'dev',
  'project.local  ': 'dev',
  'stagebackend.com': 'stage',
};

const BACKEND_HOSTNAMES = {
  'dev': 'http://wth.aleksandar-babic.com',
  'stage': 'http://stagebackend.com',
};

const SOCKET_URL = {
  'dev': 'http://wth.aleksandar-babic.com:8080',
  'stage': 'http://wth.aleksandar-babic.com:8080',
};

const API_ROUTE = '/api';

export {
  ENVIRONMENTS,
  BACKEND_HOSTNAMES,
  API_ROUTE,
};
