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
import {
  mockGoogleUser,
  mockGoogleIdToken,
  mockGoogleAuthLibrary,
} from '../mocks/modules/auth/mock-google-auth-library'

mockGoogleAuthLibrary()

describe('LoginWithGoogle (e2e)', () => {
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

  it('should login with google', async () => {
    const { body: loginWithGoogleBody } =
      await authHelper.loginWithGoogle(mockGoogleIdToken)

    const actual = loginWithGoogleBody.data.loginWithGoogle

    const expected = {
      id: expect.any(Number),
      firstName: mockGoogleUser.given_name,
      lastName: mockGoogleUser.family_name,
      email: mockGoogleUser.email,
      token: expect.any(String),
      createdAt: expect.stringMatching(isoDateStringRegexp),
      updatedAt: expect.stringMatching(isoDateStringRegexp),
    }

    expect(actual).toEqual(expected)
  })
})
