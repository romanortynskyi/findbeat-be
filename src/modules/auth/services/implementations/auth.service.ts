import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import * as argon2 from 'argon2'

import JoinResponseDto from '../../types/classes/dto/response/join-response.dto'
import UserEntity from 'src/entities/user.entity'
import AuthProvider from 'src/types/enums/auth-provider.enum'
import { getObjectWithoutKeys } from 'src/utils/get-object-without-keys'
import JoinRequestDto from '../../types/classes/dto/request/join-request.dto'
import { EmailAlreadyExistsException } from 'src/exceptions/email-already-exists.exception'
import { InternalServerErrorException } from 'src/exceptions/internal-server-error.exception'
import SignInRequestDto from '../../types/classes/dto/request/sign-in-request.dto'
import SignInResponseDto from '../../types/classes/dto/response/sign-in-response.dto'
import { WrongEmailOrPasswordException } from 'src/exceptions/wrong-email-or-password.exception'
import AbstractAuthService from '../abstract/abstract-auth.service'
import JsonWebTokenService from 'src/modules/json-web-token/services/implementations/json-web-token.service'
import OpenSearchService from 'src/modules/open-search/services/implementations/open-search.service'
import OpenSearchIndex from 'src/types/enums/open-search-index.enum'

@Injectable()
class AuthService implements AbstractAuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jsonWebTokenService: JsonWebTokenService,
    private readonly openSearchService: OpenSearchService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

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

      const username = email.split('@')[0]

      const hashedPassword = await argon2.hash(password)
      const userToInsert = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username,
      }

      const user = await queryRunner.manager.save(UserEntity, userToInsert)
      const cleanUser = getObjectWithoutKeys(user, [
        'password',
        'recoveryCode',
      ])
      const token = await this.jsonWebTokenService.signToken(cleanUser)
      const userToSend = {
        ...cleanUser,
        token,
        provider: AuthProvider.Email,
      }
      
      await queryRunner.manager.save(UserEntity, user)

      await this.openSearchService.index(OpenSearchIndex.Users, cleanUser)

      await queryRunner.commitTransaction()

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

  async signIn(dto: SignInRequestDto): Promise<SignInResponseDto> {
    const { email, password } = dto

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'role',
        'password',
        'username',
        'createdAt',
        'updatedAt',
      ],
    })

    if (!user || !user.password) {
      throw new WrongEmailOrPasswordException()
    }

    const passwordIsCorrect = await argon2.verify(user.password, password)

    if (!passwordIsCorrect) {
      throw new WrongEmailOrPasswordException()
    }

    const userWithoutPassword = getObjectWithoutKeys(user, ['password'])
    const token = await this.jsonWebTokenService.signToken(userWithoutPassword)
    const userToSend = {
      ...userWithoutPassword,
      token,
    }

    return userToSend
  }
}

export default AuthService
