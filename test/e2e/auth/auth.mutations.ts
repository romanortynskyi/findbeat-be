class AuthMutations {
  static signUp: string = `
    mutation SIGN_UP($input: SignUpInput!) {
      signUp(input: $input) {
        id
        firstName
        lastName
        email
        token
        createdAt
        updatedAt
      }
    }
  `

  static login: string = `
    mutation LOGIN($input: LoginInput!) {
      login(input: $input) {
        id
        firstName
        lastName
        email
        token
        createdAt
        updatedAt
      }
    }
  `

  static loginWithGoogle: string = `
    mutation LOGIN_WITH_GOOGLE($idToken: String!) {
      loginWithGoogle(idToken: $idToken) {
        id
        firstName
        lastName
        email
        token
        createdAt
        updatedAt
      }
    }
  `

  static loginWithFacebook: string = `
    mutation LOGIN_WITH_FACEBOOK($accessToken: String!) {
      loginWithFacebook(accessToken: $accessToken) {
        id
        firstName
        lastName
        email
        token
        createdAt
        updatedAt
      }
    }
  `

  static sendResetPasswordEmail: string = `
    mutation SEND_RESET_PASSWORD_EMAIL($input: SendResetPasswordEmailInput!) {
      sendResetPasswordEmail(input: $input)
    }
  `

  static updateUserImage: string = `
    mutation UPDATE_USER_IMAGE($input: UpdateUserImageInput!) {
      updateUserImage(input: $input) {
        id
        src
        filename
        provider
        createdAt
        updatedAt
      }
    }
  `
}

export default AuthMutations
