import JoinRequestDto from '../../types/classes/dto/request/join-request.dto'
import SignInRequestDto from '../../types/classes/dto/request/sign-in-request.dto'
import JoinResponseDto from '../../types/classes/dto/response/join-response.dto'
import SignInResponseDto from '../../types/classes/dto/response/sign-in-response.dto'

abstract class AbstractAuthService {
  abstract join(dto: JoinRequestDto): Promise<JoinResponseDto>
  abstract signIn(dto: SignInRequestDto): Promise<SignInResponseDto>
}

export default AbstractAuthService
