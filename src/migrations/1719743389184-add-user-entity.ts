import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUserEntity1719743389184 implements MigrationInterface {
  name = 'AddUserEntity1719743389184'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'admin', 'super-admin')
		`)
    await queryRunner.query(`
			CREATE TABLE "user" (
				"id" SERIAL NOT NULL,
				"createdAt" TIMESTAMP NOT NULL DEFAULT now(),
				"updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
				"firstName" character varying NOT NULL,
				"lastName" character varying NOT NULL,
				"email" character varying NOT NULL,
				"role" "public"."user_role_enum" NOT NULL DEFAULT 'user',
				"password" character varying,
				"recoveryCode" character varying,
				CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
				CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
			)`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`)
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`)
	}

}
