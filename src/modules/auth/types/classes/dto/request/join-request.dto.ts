import {
  IsEmail,
  IsString,
  Length,
} from 'class-validator'

class JoinRequestDto {
  @IsEmail()
  email: string

  @IsString()
  @Length(6)
  password: string

  @IsString()
  @Length(1)
  firstName: string

  @IsString()
  @Length(1)
  lastName: string
}

export default JoinRequestDto
