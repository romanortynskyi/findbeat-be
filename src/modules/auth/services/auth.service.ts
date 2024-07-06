import { ConflictException, Injectable } from '@nestjs/common'

import SignUpResponseDto from '../types/classes/dto/response/sign-up-response.dto'
import SignUpRequestDto from '../types/classes/dto/request/sign-up-request.dto'
import { DataSource } from 'typeorm'
import UserEntity from 'src/entities/user.entity'

@Injectable()
class AuthService {
  constructor(private readonly dataSource: DataSource) {}

  signToken(user: any) {
    // const secret = this.configService.get('JWT_SECRET')

    // return this.jwtService.signAsync(instanceToPlain(user), {
    //   expiresIn: '365d',
    //   secret,
    // })
    return ''
  }

  async signUp(dto: SignUpRequestDto): Promise<SignUpResponseDto> {
    const { email, password, firstName, lastName } = dto

    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.startTransaction()

    try {
      const responseDto: SignUpResponseDto = {
        id: 1,
        email,
        firstName,
        lastName,
        token: this.signToken({}),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      return responseDto
    }

    catch (error) {
      console.error(error)

      await queryRunner.rollbackTransaction()
    }
  }
}

export default AuthService
