import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1669766572301 implements MigrationInterface {
    name = 'initialMigration1669766572301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" integer NOT NULL`);
    }

}
