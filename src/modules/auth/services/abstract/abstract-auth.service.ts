import SignUpRequestDto from '../../types/classes/dto/request/sign-up-request.dto'
import SignInRequestDto from '../../types/classes/dto/request/sign-in-request.dto'
import SignUpResponseDto from '../../types/classes/dto/response/sign-up-response.dto'
import SignInResponseDto from '../../types/classes/dto/response/sign-in-response.dto'

abstract class AbstractAuthService {
  abstract signUp(dto: SignUpRequestDto): Promise<SignUpResponseDto>
  abstract signIn(dto: SignInRequestDto): Promise<SignInResponseDto>
}

export default AbstractAuthService
