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
import FacebookApiService from 'src/modules/facebook-api/services/implementations/facebook-api.service'
import {
  mockFacebookApiService,
  mockFacebookUser,
} from '../mocks/modules/facebook-api/services/mock-facebook-api-service'

describe('LoginWithFacebook (e2e)', () => {
  let app: INestApplication
  let dataSource: DataSource
  let authHelper: AuthHelper

  const mockFacebookAccessToken = 'mock-facebook-access-token'

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(OpenSearchService)
      .useValue(mockOpenSearchService)
      .overrideProvider(StripeAccountService)
      .useValue(mockStripeAccountService)
      .overrideProvider(FacebookApiService)
      .useValue(mockFacebookApiService)
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

  it('should login with facebook', async () => {
    const { body: loginWithFacebookBody } = await authHelper.loginWithFacebook(
      mockFacebookAccessToken,
    )

    const actual = loginWithFacebookBody.data.loginWithFacebook

    const expected = {
      id: expect.any(Number),
      firstName: mockFacebookUser.firstName,
      lastName: mockFacebookUser.lastName,
      email: mockFacebookUser.email,
      token: expect.any(String),
      createdAt: expect.stringMatching(isoDateStringRegexp),
      updatedAt: expect.stringMatching(isoDateStringRegexp),
    }

    expect(actual).toEqual(expected)
  })
})
