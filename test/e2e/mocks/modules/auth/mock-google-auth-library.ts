import { OAuth2Client } from 'google-auth-library'

export const mockGoogleUser = {
  given_name: 'test',
  family_name: 'test',
  email: 'test@test.com',
  sub: '123456789',
}

export const mockGoogleIdToken = [
  Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString(
    'base64url',
  ),
  Buffer.from(JSON.stringify(mockGoogleUser)).toString('base64url'),
  'signature',
].join('.')

export const mockGoogleAuthLibrary = () =>
  jest.spyOn(OAuth2Client.prototype, 'verifyIdToken').mockResolvedValue({
    getPayload: () => mockGoogleUser,
  } as never)
