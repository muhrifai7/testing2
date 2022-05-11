import {MigrationInterface, QueryRunner} from "typeorm";

export class Migrations1652241984032 implements MigrationInterface {
    name = 'Migrations1652241984032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "absence" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                "from" character varying NOT NULL,
                "to" character varying NOT NULL,
                "created_by" character varying NOT NULL,
                "updated_by" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_30089b15c0f880f026581218c16" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "permission" (
                "id" SERIAL NOT NULL,
                "can_create" boolean DEFAULT false,
                "can_update" boolean DEFAULT false,
                "can_delete" boolean DEFAULT false,
                "can_read" boolean DEFAULT false,
                "description" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "role_id" integer NOT NULL,
                CONSTRAINT "REL_383892d758d08d346f837d3d8b" UNIQUE ("role_id"),
                CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "role" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"),
                CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "profile" (
                "id" SERIAL NOT NULL,
                "place_of_birth" character varying,
                "date_of_birth" character varying,
                "gender" character varying DEFAULT 'MALE',
                "religion" character varying,
                "academic" character varying,
                "title" character varying,
                "address" character varying,
                "city" character varying,
                "country" character varying,
                "postal_code" character varying,
                "photo" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" integer NOT NULL,
                CONSTRAINT "REL_d752442f45f258a8bdefeebb2f" UNIQUE ("user_id"),
                CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "department" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "modules" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "code" character varying NOT NULL,
                "can_create" character varying NOT NULL,
                "can_update" character varying NOT NULL,
                "can_read" character varying NOT NULL,
                "can_delete" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" integer NOT NULL,
                CONSTRAINT "PK_7dbefd488bd96c5bf31f0ce0c95" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "email_blast" (
                "id" SERIAL NOT NULL,
                "subject" character varying NOT NULL,
                "email_type" character varying NOT NULL,
                "content" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" integer,
                CONSTRAINT "PK_4582502e03da142a4449da8d34c" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "payroll" (
                "id" SERIAL NOT NULL,
                "total_pay" integer NOT NULL,
                "paid_date" character varying NOT NULL,
                "created_by" character varying NOT NULL,
                "updated_by" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "salaries_id" integer NOT NULL,
                CONSTRAINT "PK_7a76b819506029fc535b6e002e0" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "salaries" (
                "id" SERIAL NOT NULL,
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
                "created_by" character varying,
                "updated_by" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" integer NOT NULL,
                CONSTRAINT "REL_c12591382bdd41fa79264f339e" UNIQUE ("user_id"),
                CONSTRAINT "PK_20ca60aa8d4201c7bcb430fdb36" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user_tax" (
                "id" SERIAL NOT NULL,
                "user_id" integer NOT NULL,
                "name" character varying,
                "tax" character varying NOT NULL,
                "bpjs" character varying NOT NULL,
                "description" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "REL_52655d5c0c3fa89f54575a7c12" UNIQUE ("user_id"),
                CONSTRAINT "PK_0a7d7fda471d4aa8dd655e73518" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "profesion" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_b4cdec71ced44e8e064fba09870" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tu_user" (
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "basic_salary" character varying,
                "password" character varying NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                "username" character varying,
                "account_number" character varying,
                "join_date" TIMESTAMP NOT NULL DEFAULT now(),
                "nik" character varying,
                "nip" character varying,
                "role_name" character varying NOT NULL DEFAULT 'STANDARD',
                "language" character varying(15) NOT NULL DEFAULT 'en-US',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "role_id" integer,
                "department_id" integer,
                "profesion_id" integer,
                CONSTRAINT "UQ_017e96eadd2266be841126a71ef" UNIQUE ("email"),
                CONSTRAINT "UQ_3a310deae43606d7704986ced03" UNIQUE ("nik"),
                CONSTRAINT "UQ_61e5e2a7cfbc6d4eb1d67b19d71" UNIQUE ("nip"),
                CONSTRAINT "PK_2795790bcc590eab1cfd5f14f1c" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "attendance" (
                "id" SERIAL NOT NULL,
                "title" character varying,
                "time_of_entry" character varying,
                "time_of_out" character varying,
                "total_working_days" character varying,
                "created_by" character varying,
                "updated_by" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT '2022-05-11',
                "updated_at" TIMESTAMP NOT NULL DEFAULT '2022-05-11',
                "user_id" integer NOT NULL,
                CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "bank" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "code" character varying NOT NULL,
                CONSTRAINT "PK_7651eaf705126155142947926e8" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "bank_account" (
                "id" SERIAL NOT NULL,
                "nik" character varying NOT NULL,
                "description" character varying NOT NULL,
                "account_number" character varying NOT NULL,
                "created_by" character varying NOT NULL,
                "updated_by" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_f3246deb6b79123482c6adb9745" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "furlough" (
                "id" SERIAL NOT NULL,
                "nik" character varying NOT NULL,
                "description" character varying NOT NULL,
                "leave_date" character varying NOT NULL,
                "created_by" character varying NOT NULL,
                "updated_by" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_ef606229ae3c12a062a6808334c" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "info" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "subtitle" character varying NOT NULL,
                "image_url" character varying NOT NULL,
                "content" character varying NOT NULL,
                "created_by" character varying NOT NULL,
                "updated_by" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_687dc5e25f4f1ee093a45b68bb7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "occupation" (
                "id" SERIAL NOT NULL,
                "code" character varying NOT NULL,
                "name" integer NOT NULL,
                "daily_rate" character varying NOT NULL,
                "montly_rate" character varying NOT NULL,
                "working_days_per_month" character varying NOT NULL,
                "updated_by" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_07cfcefef555693d96dce8805c5" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "overtime" (
                "id" SERIAL NOT NULL,
                "nip" character varying NOT NULL,
                "overtime_date" integer NOT NULL,
                "description" character varying NOT NULL,
                "updated_by" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_9c8b3927dee0be83907202c2389" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "sub_modules" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "code" character varying NOT NULL,
                "can_create" character varying NOT NULL,
                "can_update" character varying NOT NULL,
                "can_read" character varying NOT NULL,
                "can_delete" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_5ff0a1cb4fee84375a8caeefa47" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "permission"
            ADD CONSTRAINT "FK_383892d758d08d346f837d3d8b7" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD CONSTRAINT "FK_d752442f45f258a8bdefeebb2f2" FOREIGN KEY ("user_id") REFERENCES "tu_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "modules"
            ADD CONSTRAINT "FK_c4a51ce3cef38e3099962872399" FOREIGN KEY ("user_id") REFERENCES "tu_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "email_blast"
            ADD CONSTRAINT "FK_d75c0aa54cacf82f69fe7be1247" FOREIGN KEY ("user_id") REFERENCES "tu_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "payroll"
            ADD CONSTRAINT "FK_b13651381bc7fb6b56f44edb6cc" FOREIGN KEY ("salaries_id") REFERENCES "salaries"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD CONSTRAINT "FK_c12591382bdd41fa79264f339e0" FOREIGN KEY ("user_id") REFERENCES "tu_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user_tax"
            ADD CONSTRAINT "FK_52655d5c0c3fa89f54575a7c123" FOREIGN KEY ("user_id") REFERENCES "tu_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tu_user"
            ADD CONSTRAINT "FK_efb0d7207d84f23b706133884d5" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tu_user"
            ADD CONSTRAINT "FK_c00e3143f25268b880eb5c22abd" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tu_user"
            ADD CONSTRAINT "FK_7c4e240b8d547b24c7a0a429af0" FOREIGN KEY ("profesion_id") REFERENCES "profesion"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance"
            ADD CONSTRAINT "FK_0bedbcc8d5f9b9ec4979f519597" FOREIGN KEY ("user_id") REFERENCES "tu_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "attendance" DROP CONSTRAINT "FK_0bedbcc8d5f9b9ec4979f519597"
        `);
        await queryRunner.query(`
            ALTER TABLE "tu_user" DROP CONSTRAINT "FK_7c4e240b8d547b24c7a0a429af0"
        `);
        await queryRunner.query(`
            ALTER TABLE "tu_user" DROP CONSTRAINT "FK_c00e3143f25268b880eb5c22abd"
        `);
        await queryRunner.query(`
            ALTER TABLE "tu_user" DROP CONSTRAINT "FK_efb0d7207d84f23b706133884d5"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_tax" DROP CONSTRAINT "FK_52655d5c0c3fa89f54575a7c123"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP CONSTRAINT "FK_c12591382bdd41fa79264f339e0"
        `);
        await queryRunner.query(`
            ALTER TABLE "payroll" DROP CONSTRAINT "FK_b13651381bc7fb6b56f44edb6cc"
        `);
        await queryRunner.query(`
            ALTER TABLE "email_blast" DROP CONSTRAINT "FK_d75c0aa54cacf82f69fe7be1247"
        `);
        await queryRunner.query(`
            ALTER TABLE "modules" DROP CONSTRAINT "FK_c4a51ce3cef38e3099962872399"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP CONSTRAINT "FK_d752442f45f258a8bdefeebb2f2"
        `);
        await queryRunner.query(`
            ALTER TABLE "permission" DROP CONSTRAINT "FK_383892d758d08d346f837d3d8b7"
        `);
        await queryRunner.query(`
            DROP TABLE "sub_modules"
        `);
        await queryRunner.query(`
            DROP TABLE "overtime"
        `);
        await queryRunner.query(`
            DROP TABLE "occupation"
        `);
        await queryRunner.query(`
            DROP TABLE "info"
        `);
        await queryRunner.query(`
            DROP TABLE "furlough"
        `);
        await queryRunner.query(`
            DROP TABLE "bank_account"
        `);
        await queryRunner.query(`
            DROP TABLE "bank"
        `);
        await queryRunner.query(`
            DROP TABLE "attendance"
        `);
        await queryRunner.query(`
            DROP TABLE "tu_user"
        `);
        await queryRunner.query(`
            DROP TABLE "profesion"
        `);
        await queryRunner.query(`
            DROP TABLE "user_tax"
        `);
        await queryRunner.query(`
            DROP TABLE "salaries"
        `);
        await queryRunner.query(`
            DROP TABLE "payroll"
        `);
        await queryRunner.query(`
            DROP TABLE "email_blast"
        `);
        await queryRunner.query(`
            DROP TABLE "modules"
        `);
        await queryRunner.query(`
            DROP TABLE "department"
        `);
        await queryRunner.query(`
            DROP TABLE "profile"
        `);
        await queryRunner.query(`
            DROP TABLE "role"
        `);
        await queryRunner.query(`
            DROP TABLE "permission"
        `);
        await queryRunner.query(`
            DROP TABLE "absence"
        `);
    }

}
