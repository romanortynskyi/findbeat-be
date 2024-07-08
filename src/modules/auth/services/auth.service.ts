import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { DataSource } from 'typeorm'
import { instanceToPlain } from 'class-transformer'
import * as argon2 from 'argon2'

import JoinResponseDto from '../types/classes/dto/response/join-response.dto'
import UserEntity from 'src/entities/user.entity'
import AuthProvider from 'src/types/enums/auth-provider.enum'
import { getObjectWithoutKeys } from 'src/utils/get-object-without-keys'
import JoinRequestDto from '../types/classes/dto/request/join-request.dto'
import { EmailAlreadyExistsException } from 'src/exceptions/email-already-exists.exception'
import { InternalServerErrorException } from 'src/exceptions/internal-server-error.exception'

@Injectable()
class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  signToken(user: UserEntity): Promise<string> {
    const secret = this.configService.get('JWT_SECRET')
    const expiresIn = this.configService.get('JWT_EXPIRES_IN')

    return this.jwtService.signAsync(instanceToPlain(user), {
      expiresIn,
      secret,
    })
  }

  async join(dto: JoinRequestDto): Promise<JoinResponseDto> {
    const { email, password, firstName, lastName } = dto

    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.startTransaction()

    try {
      const userByEmail = await queryRunner.manager.findOneBy(UserEntity, {
        email,
      })

      if (userByEmail) {
        throw new EmailAlreadyExistsException()
      }

      const hashedPassword = await argon2.hash(password)
      const userToInsert = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      }

      const user = await queryRunner.manager.save(UserEntity, userToInsert)
      const cleanUser = getObjectWithoutKeys(user, [
        'password',
        'recoveryCode',
      ])
      const token = await this.signToken(cleanUser)
      const userToSend = {
        ...cleanUser,
        token,
        provider: AuthProvider.Email,
      }

      // const userToIndex = getObjectWithoutKeys(
      //   userWithoutPassword,
      //   ['recoveryCode'],
      // )
      
      await queryRunner.manager.save(UserEntity, user)

      await queryRunner.commitTransaction()

      // await this.openSearchService.index(OpenSearchIndex.Users, userToIndex)

      return userToSend
    }

    catch (error) {
      console.error(error)

      await queryRunner.rollbackTransaction()

      if (!(error instanceof EmailAlreadyExistsException)) {
        const { message } = error

        throw new InternalServerErrorException(message)
      }

      throw error
    }
  }
}

export default AuthService
