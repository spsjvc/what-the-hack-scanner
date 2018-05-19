const ENVIRONMENTS = {
  'localhost': 'dev',
  'project.local  ': 'dev',
  'stagebackend.com': 'stage',
};

const BACKEND_HOSTNAMES = {
  'dev': 'http://localhost:8000',
  'stage': 'http://stagebackend.com',
};

const API_ROUTE = '/api';

export {
  ENVIRONMENTS,
  BACKEND_HOSTNAMES,
  API_ROUTE,
};
