import ResponseDto from 'src/types/classes/dto/response.dto'

class SignInResponseDto extends ResponseDto {
  firstName: string
  lastName: string
  email: string
  token: string
}

export default SignInResponseDto
