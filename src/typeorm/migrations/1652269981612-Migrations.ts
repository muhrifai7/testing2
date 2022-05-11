import {MigrationInterface, QueryRunner} from "typeorm";

export class Migrations1652269981612 implements MigrationInterface {
    name = 'Migrations1652269981612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "attendance"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-11'
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-11'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "attendance"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-11 00:00:00'
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-11 00:00:00'
        `);
    }

}
