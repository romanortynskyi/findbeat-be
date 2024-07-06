import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { AppModule } from 'src/app.module'
import OpenSearchService from 'src/modules/open-search/services/implementations/open-search.service'
import mockOpenSearchService from '../mocks/modules/open-search/services/mock-open-search-service'
import StripeAccountService from 'src/modules/stripe/services/stripe-account.service'
import mockStripeAccountService from '../mocks/modules/stripe/services/mock-stripe-account-service'
import AuthHelper from './auth.helper'
import mockUser from '../mocks/modules/auth/mock-user'

describe('LoginWithFacebook (e2e)', () => {
  let app: INestApplication
  let dataSource: DataSource
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
  })

  afterEach(async () => {
    jest.resetAllMocks()

    await dataSource.dropDatabase()
    await dataSource.destroy()

    await app.close()
  })

  it('should get me', async () => {
    const { body: signUpBody } = await authHelper.signUp(mockUser)

    const signUpResult = signUpBody.data.signUp
    const { token } = signUpResult
    const bearerToken = `Bearer ${token}`

    const { body: getMeBody } = await authHelper.getMe(bearerToken)

    const actual = getMeBody.data.getMe

    const expected = {
      id: signUpResult.id,
      firstName: signUpResult.firstName,
      lastName: signUpResult.lastName,
      email: signUpResult.email,
      createdAt: signUpResult.createdAt,
      updatedAt: signUpResult.updatedAt,
    }

    expect(actual).toEqual(expected)
  })
})
