import {
  IsEmail,
  IsString,
  Length,
} from 'class-validator'

class SignInRequestDto {
  @IsEmail()
  email: string

  @IsString()
  @Length(6)
  password: string
}

export default SignInRequestDto
