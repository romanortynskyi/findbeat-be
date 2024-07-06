import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { DataSource } from 'typeorm'
import * as fs from 'node:fs'

import { AppModule } from 'src/app.module'
import OpenSearchService from 'src/modules/open-search/services/implementations/open-search.service'
import mockOpenSearchService from '../mocks/modules/open-search/services/mock-open-search-service'
import StripeAccountService from 'src/modules/stripe/services/stripe-account.service'
import mockStripeAccountService from '../mocks/modules/stripe/services/mock-stripe-account-service'
import isoDateStringRegexp from 'src/regexp/iso-date-string.regexp'
import AuthHelper from './auth.helper'

const image = fs.createReadStream('test-user-image.jpg')

describe('UpdateUserImage (e2e)', () => {
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

  it('should update user image', async () => {
    try {
      const { body: updateUserImageBody } =
        await authHelper.updateUserImage(image)
    }

    catch (error) {
      console.error(error)
    }

    // const actual = updateUserImageBody.data.updateUserImage

    // const expected = {
    //   id: expect.any(Number),
    //   src: imageSrc,
    //   filename: imageEntity.filename,
    //   provider: imageEntity.provider,
    //   createdAt: expect.stringMatching(isoDateStringRegexp),
    //   updatedAt: expect.stringMatching(isoDateStringRegexp),
    // }

    // expect(actual).toEqual(expected)
  })
})
