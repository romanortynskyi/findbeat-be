import { MigrationInterface, QueryRunner } from 'typeorm'

class AddUserUsername1721563834090 implements MigrationInterface {
  name = 'AddUserUsername1721563834090'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			ALTER TABLE "user"
			ADD "username" character varying NOT NULL
		`)
    await queryRunner.query(`
			ALTER TABLE "user"
			ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")
		`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			ALTER TABLE "user"
			DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"
		`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`)
  }
}

export default AddUserUsername1721563834090
