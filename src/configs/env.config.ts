import { ConfigModuleOptions } from '@nestjs/config'

import getEnvFilePath from 'src/utils/get-env-file-path'

const envConfig: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: getEnvFilePath(),
}

export default envConfig

