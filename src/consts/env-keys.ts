const envKeys = {
  database: {
    host: 'DATABASE_HOST',
    port: 'DATABASE_PORT',
    username: 'DATABASE_USER',
    password: 'DATABASE_PASSWORD',
    name: 'DATABASE_NAME',
  },
  jwt: {
    secret: 'JWT_SECRET',
    expiresIn: 'JWT_EXPIRES_IN',
  },
  openSearch: {
    endpoint: 'OPENSEARCH_ENDPOINT',
    username: 'OPENSEARCH_USERNAME',
    password: 'OPENSEARCH_PASSWORD',
  },
}

export default envKeys
