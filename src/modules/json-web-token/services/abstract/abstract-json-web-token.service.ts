import UserEntity from 'src/entities/user.entity'

abstract class AbstractJsonWebTokenService {
  abstract signToken(user: UserEntity): Promise<string>
}

export default AbstractJsonWebTokenService
