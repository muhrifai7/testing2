import {MigrationInterface, QueryRunner} from "typeorm";

export class Migrations1662347499347 implements MigrationInterface {
    name = 'Migrations1662347499347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "payroll" (
                "id" SERIAL NOT NULL,
                "total_pay" integer,
                "paid_date" character varying,
                "created_by" character varying NOT NULL,
                "updated_by" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "basic_salaries" integer,
                "total_salaries" integer,
                "overtime" integer,
                "professional_allowance" integer,
                "health_allowance" integer,
                "meal_allowance" integer,
                "positional_allowance" integer,
                "transportation_allowance" integer,
                "operator_allowance" integer,
                "health_subsidy_bpjs" integer,
                "taktis_allowance" integer,
                "performance_allowance" integer,
                "service_allowance" integer,
                "pph_deduction" integer,
                "pph_allowance" integer,
                "bpjs_allowance" integer,
                "loan_deduction" integer,
                "bpjs_deduction" integer,
                "deduction_jkn" integer,
                "deduction_jk" integer,
                "deduction_jht" integer,
                "deduction_jht1" integer,
                "deduction_pension" integer,
                "deduction_pension1" integer,
                "salaries_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                CONSTRAINT "PK_7a76b819506029fc535b6e002e0" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-09-05'
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-09-05'
        `);
        await queryRunner.query(`
            ALTER TABLE "payroll"
            ADD CONSTRAINT "FK_b13651381bc7fb6b56f44edb6cc" FOREIGN KEY ("salaries_id") REFERENCES "salaries"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "payroll"
            ADD CONSTRAINT "FK_33b3121c809973d825ecc9b938f" FOREIGN KEY ("user_id") REFERENCES "tu_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "payroll" DROP CONSTRAINT "FK_33b3121c809973d825ecc9b938f"
        `);
        await queryRunner.query(`
            ALTER TABLE "payroll" DROP CONSTRAINT "FK_b13651381bc7fb6b56f44edb6cc"
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-09-05 00:00:00'
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-09-05 00:00:00'
        `);
        await queryRunner.query(`
            DROP TABLE "payroll"
        `);
    }

}
