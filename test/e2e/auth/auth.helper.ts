import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import * as fs from 'node:fs'

import SignUpInput from 'src/modules/auth/types/classes/inputs/sign-up.input'
import AuthMutations from './auth.mutations'
import LoginInput from 'src/modules/auth/types/classes/inputs/login.input'
import SendResetPasswordEmailInput from 'src/modules/auth/types/classes/inputs/send-reset-password-email.input'
import UpdateUserImageInput from 'src/modules/auth/types/classes/inputs/update-user-image.input'
import AuthQueries from './auth.queries'

class AuthHelper {
  constructor(private readonly app: INestApplication) {}

  signUp(input: SignUpInput): Promise<any> {
    return request(this.app.getHttpServer())
      .post('/graphql')
      .send({
        query: AuthMutations.signUp,
        variables: {
          input,
        },
      })
  }

  login(input: LoginInput): Promise<any> {
    return request(this.app.getHttpServer())
      .post('/graphql')
      .send({
        query: AuthMutations.login,
        variables: {
          input,
        },
      })
  }

  loginWithGoogle(idToken: string): Promise<any> {
    return request(this.app.getHttpServer())
      .post('/graphql')
      .send({
        query: AuthMutations.loginWithGoogle,
        variables: {
          idToken,
        },
      })
  }

  loginWithFacebook(accessToken: string): Promise<any> {
    return request(this.app.getHttpServer())
      .post('/graphql')
      .send({
        query: AuthMutations.loginWithFacebook,
        variables: {
          accessToken,
        },
      })
  }

  sendResetPasswordEmail(input: SendResetPasswordEmailInput): Promise<any> {
    return request(this.app.getHttpServer())
      .post('/graphql')
      .send({
        query: AuthMutations.sendResetPasswordEmail,
        variables: {
          input,
        },
      })
  }

  updateUserImage(image: fs.ReadStream): Promise<any> {
    const operations = {
      query: AuthMutations.updateUserImage,
      variables: {
        input: {
          image,
        },
      },
    }

    const map = {
      '0': ['variables.input.image'],
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        const test = request(this.app.getHttpServer())
          .post('/graphql')
          .set('Content-Type', 'multipart/form-data')
          .field('operations', JSON.stringify(operations))
          .field('map', JSON.stringify(map))
          .attach('0', image, { filename: 'test-file.txt' })

        resolve(test)
      })
    })
  }

  getMe(bearerToken: string): Promise<any> {
    return request(this.app.getHttpServer())
      .post('/graphql')
      .set('Authorization', bearerToken)
      .send({
        query: AuthQueries.getMe,
      })
  }
}

export default AuthHelper
