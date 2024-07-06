import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { AppModule } from 'src/app.module'
import OpenSearchService from 'src/modules/open-search/services/implementations/open-search.service'
import mockOpenSearchService from '../mocks/modules/open-search/services/mock-open-search-service'
import StripeAccountService from 'src/modules/stripe/services/stripe-account.service'
import mockStripeAccountService from '../mocks/modules/stripe/services/mock-stripe-account-service'
import AuthHelper from './auth.helper'
import EmailService from 'src/modules/email/email.service'
import mockEmailService from '../mocks/modules/email/services/mock-email-service'
import mockUser from '../mocks/modules/auth/mock-user'

jest.useFakeTimers({
  legacyFakeTimers: true,
})

describe('SendResetPasswordEmail (e2e)', () => {
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
      .overrideProvider(EmailService)
      .useValue(mockEmailService)
      .compile()

    app = moduleFixture.createNestApplication()

    dataSource = app.get(DataSource)
    await dataSource.synchronize(true)

    await app.init()

    authHelper = new AuthHelper(app)

    await authHelper.signUp(mockUser)
  })

  afterEach(async () => {
    await dataSource.dropDatabase()
    await dataSource.destroy()

    await app.close()

    jest.resetAllMocks()
  })

  it('should send reset password email', async () => {
    const { body: sendResetPasswordEmailBody } =
      await authHelper.sendResetPasswordEmail({
        email: mockUser.email,
      })

    const actual = sendResetPasswordEmailBody.data.sendResetPasswordEmail

    const expected = true

    expect(actual).toEqual(expected)
  })
})
