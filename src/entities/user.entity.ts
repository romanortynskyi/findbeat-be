import {
  Column,
  Entity,
} from 'typeorm'

import BaseEntity from './base.entity'
import Role from '../types/enums/role.enum'

@Entity('user')
class UserEntity extends BaseEntity {
  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  username: string

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role

  @Column({ select: false, nullable: true })
  password: string

  @Column({ nullable: true })
  recoveryCode: string
}

export default UserEntity
