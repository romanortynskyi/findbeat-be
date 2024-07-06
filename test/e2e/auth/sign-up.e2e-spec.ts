import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { AppModule } from 'src/app.module'
import OpenSearchService from 'src/modules/open-search/services/implementations/open-search.service'
import mockOpenSearchService from '../mocks/modules/open-search/services/mock-open-search-service'
import StripeAccountService from 'src/modules/stripe/services/stripe-account.service'
import mockStripeAccountService from '../mocks/modules/stripe/services/mock-stripe-account-service'
import UserWithToken from 'src/modules/auth/types/classes/user-with-token'
import isoDateStringRegexp from 'src/regexp/iso-date-string.regexp'
import AuthHelper from './auth.helper'
import ErrorMessage from 'src/enums/error-message.enum'
import mockUser from '../mocks/modules/auth/mock-user'

describe('SignUp (e2e)', () => {
  let app: INestApplication
  let dataSource: DataSource
  let user: UserWithToken
  let authHelper: AuthHelper

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

    const { body } = await authHelper.signUp(mockUser)

    user = body.data.signUp
  })

  afterEach(async () => {
    await dataSource.dropDatabase()
    await dataSource.destroy()

    await app.close()
  })

  it('should sign up', async () => {
    const actual = user

    const expected = {
      id: expect.any(Number),
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      email: mockUser.email,
      token: expect.any(String),
      createdAt: expect.stringMatching(isoDateStringRegexp),
      updatedAt: expect.stringMatching(isoDateStringRegexp),
    }

    expect(actual).toEqual(expected)
  })

  it('should throw if email already exists', async () => {
    const { body } = await authHelper.signUp(mockUser)

    const actual = body.errors

    const expected = expect.arrayContaining([
      expect.objectContaining({
        message: ErrorMessage.EmailAlreadyExists,
      })
    ])

    expect(actual).toEqual(expected)
  })
})
