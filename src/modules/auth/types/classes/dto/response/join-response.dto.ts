import ResponseDto from 'src/types/classes/dto/response.dto'

class JoinResponseDto extends ResponseDto {
  firstName: string
  lastName: string
  email: string
  token: string
}

export default JoinResponseDto
