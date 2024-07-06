export const mockFacebookUser = {
  firstName: 'test',
  lastName: 'test',
  email: 'test@test.com',
  imgSrc: '123456789',
}

export const mockFacebookApiService = {
  getMe: () => {
    return new Promise((resolve) => resolve(mockFacebookUser))
  },
}
