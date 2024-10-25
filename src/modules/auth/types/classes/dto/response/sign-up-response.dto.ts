import ResponseDto from 'src/types/classes/dto/response.dto'

class SignUpResponseDto extends ResponseDto {
  firstName: string
  lastName: string
  email: string
  token: string
}

export default SignUpResponseDto
