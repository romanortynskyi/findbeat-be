const envFilePaths = {
  development: '.env.local',
  test: '.env.test',
}

const getEnvFilePath = (): string => {
  const nodeEnv = process.env.NODE_ENV || 'development'

  return envFilePaths[nodeEnv]
}

export default getEnvFilePath
