import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { AppModule } from 'src/app.module'
import OpenSearchService from 'src/modules/open-search/services/implementations/open-search.service'
import mockOpenSearchService from '../mocks/modules/open-search/services/mock-open-search-service'
import StripeAccountService from 'src/modules/stripe/services/stripe-account.service'
import mockStripeAccountService from '../mocks/modules/stripe/services/mock-stripe-account-service'
import isoDateStringRegexp from 'src/regexp/iso-date-string.regexp'
import AuthHelper from './auth.helper'
import ErroMessage from 'src/enums/error-message.enum'
import ErrorMessage from 'src/enums/error-message.enum'

describe('Login (e2e)', () => {
  let app: INestApplication
  let dataSource: DataSource
  let authHelper: AuthHelper

  const signUpInput = {
    email: 'lol@mail.com',
    password: 'lolpass',
    firstName: 'Vasia',
    lastName: 'Pupkin',
  }
  const wrongEmail = 'wrongemail@mail.com'
  const wrongPassword = 'wrongpass'

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(OpenSearchService)
      .useValue(mockOpenSearchService)
      .overrideProvider(StripeAccountService)
      .useValue(mockStripeAccountService)
      .compile()

    app = moduleFixture.createNestApplication()

    dataSource = app.get(DataSource)
    await dataSource.synchronize(true)

    await app.init()

    authHelper = new AuthHelper(app)
  })

  afterEach(async () => {
    await dataSource.dropDatabase()
    await dataSource.destroy()

    await app.close()
  })

  it('should login', async () => {
    const loginInput = {
      email: signUpInput.email,
      password: signUpInput.password,
    }

    await authHelper.signUp(signUpInput)
    const { body: loginBody } = await authHelper.login(loginInput)

    const actual = loginBody.data.login

    const expected = {
      id: expect.any(Number),
      firstName: signUpInput.firstName,
      lastName: signUpInput.lastName,
      email: loginInput.email,
      token: expect.any(String),
      createdAt: expect.stringMatching(isoDateStringRegexp),
      updatedAt: expect.stringMatching(isoDateStringRegexp),
    }

    expect(actual).toEqual(expected)
  })

  it('should throw if email is incorrect', async () => {
    const loginInput = {
      email: wrongEmail,
      password: signUpInput.password,
    }

    await authHelper.signUp(signUpInput)
    const { body: loginBody } = await authHelper.login(loginInput)

    const actual = loginBody.errors

    const expected = expect.arrayContaining([
      expect.objectContaining({
        message: ErroMessage.WrongEmailOrPassword,
      })
    ])

    expect(actual).toEqual(expected)
  })

  it('should throw if password is incorrect', async () => {
    const loginInput = {
      email: signUpInput.email,
      password: wrongPassword,
    }

    await authHelper.signUp(signUpInput)
    const { body: loginBody } = await authHelper.login(loginInput)

    const actual = loginBody.errors

    const expected = expect.arrayContaining([
      expect.objectContaining({
        message: ErrorMessage.WrongEmailOrPassword,
      })
    ])

    expect(actual).toEqual(expected)
  })
})
