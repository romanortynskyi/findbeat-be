class AuthQueries {
  static getMe: string = `
    query GET_ME {
      getMe {
        id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
    }
  `
}

export default AuthQueries
