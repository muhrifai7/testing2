import {MigrationInterface, QueryRunner} from "typeorm";

export class Migrations1656804821751 implements MigrationInterface {
    name = 'Migrations1656804821751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "email_blast" DROP CONSTRAINT "FK_03d4152eecc497a2b5f76aa5a63"
        `);
        await queryRunner.query(`
            ALTER TABLE "overtime"
                RENAME COLUMN "overtimeDate" TO "overtime_date"
        `);
        await queryRunner.query(`
            ALTER TABLE "absence" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "absence" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "permission" DROP COLUMN "canCreate"
        `);
        await queryRunner.query(`
            ALTER TABLE "permission" DROP COLUMN "canUpdate"
        `);
        await queryRunner.query(`
            ALTER TABLE "permission" DROP COLUMN "canDelete"
        `);
        await queryRunner.query(`
            ALTER TABLE "permission" DROP COLUMN "canRead"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP COLUMN "placeOfBirth"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP COLUMN "dateOfBirth"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP COLUMN "postalCode"
        `);
        await queryRunner.query(`
            ALTER TABLE "modules" DROP COLUMN "canCreate"
        `);
        await queryRunner.query(`
            ALTER TABLE "modules" DROP COLUMN "canUpdate"
        `);
        await queryRunner.query(`
            ALTER TABLE "modules" DROP COLUMN "canRead"
        `);
        await queryRunner.query(`
            ALTER TABLE "modules" DROP COLUMN "canDelete"
        `);
        await queryRunner.query(`
            ALTER TABLE "email_blast" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "email_blast" DROP COLUMN "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "email_blast" DROP COLUMN "emailType"
        `);
        await queryRunner.query(`
            ALTER TABLE "payroll" DROP COLUMN "totalPay"
        `);
        await queryRunner.query(`
            ALTER TABLE "payroll" DROP COLUMN "paidDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "basicSalaries"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "totalSalaries"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "professionalAllowance"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "healthAllowance"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "mealAllowance"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "positionalAllowance"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "transportationAllowance"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "operatorAllowance"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "healthSubsidyBpjs"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "taktisAllowance"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "performanceAllowance"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "serviceAllowance"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "pphDeduction"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "pphAllowance"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "bpjsAllowance"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "loanDeduction"
        `);
        await queryRunner.query(`
            ALTER TABLE "tu_user" DROP COLUMN "isActive"
        `);
        await queryRunner.query(`
            ALTER TABLE "tu_user" DROP COLUMN "basicSalary"
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance" DROP COLUMN "timeOfEntry"
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance" DROP COLUMN "timeOfOut"
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance" DROP COLUMN "totalWorkingDays"
        `);
        await queryRunner.query(`
            ALTER TABLE "bank_account" DROP COLUMN "accountNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "bank_account" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "bank_account" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "furlough" DROP COLUMN "leaveDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "furlough" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "furlough" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "info" DROP COLUMN "imageUrl"
        `);
        await queryRunner.query(`
            ALTER TABLE "info" DROP COLUMN "createdBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "info" DROP COLUMN "updatedBy"
        `);
        await queryRunner.query(`
            ALTER TABLE "occupation" DROP COLUMN "dailyRate"
        `);
        await queryRunner.query(`
            ALTER TABLE "occupation" DROP COLUMN "montlyRate"
        `);
        await queryRunner.query(`
            ALTER TABLE "occupation" DROP COLUMN "workingDaysPerMonth"
        `);
        await queryRunner.query(`
            ALTER TABLE "sub_modules" DROP COLUMN "canDelete"
        `);
        await queryRunner.query(`
            ALTER TABLE "sub_modules" DROP COLUMN "canCreate"
        `);
        await queryRunner.query(`
            ALTER TABLE "sub_modules" DROP COLUMN "canUpdate"
        `);
        await queryRunner.query(`
            ALTER TABLE "sub_modules" DROP COLUMN "canRead"
        `);
        await queryRunner.query(`
            ALTER TABLE "absence"
            ADD "created_by" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "absence"
            ADD "updated_by" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "permission"
            ADD "can_create" boolean DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "permission"
            ADD "can_update" boolean DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "permission"
            ADD "can_delete" boolean DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "permission"
            ADD "can_read" boolean DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD "place_of_birth" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD "date_of_birth" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD "postal_code" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "modules"
            ADD "can_create" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "modules"
            ADD "can_update" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "modules"
            ADD "can_read" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "modules"
            ADD "can_delete" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "email_blast"
            ADD "email_type" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "email_blast"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "email_blast"
            ADD "user_id" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "payroll"
            ADD "total_pay" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "payroll"
            ADD "paid_date" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "basic_salaries" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "total_salaries" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "professional_allowance" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "health_allowance" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "meal_allowance" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "positional_allowance" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "transportation_allowance" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "operator_allowance" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "health_subsidy_bpjs" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "taktis_allowance" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "performance_allowance" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "service_allowance" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "pph_deduction" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "pph_allowance" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "bpjs_allowance" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "loan_deduction" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tu_user"
            ADD "basic_salary" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "tu_user"
            ADD "is_active" boolean NOT NULL DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance"
            ADD "time_of_entry" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance"
            ADD "time_of_out" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance"
            ADD "total_working_days" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "bank_account"
            ADD "account_number" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "bank_account"
            ADD "created_by" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "bank_account"
            ADD "updated_by" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "furlough"
            ADD "leave_date" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "furlough"
            ADD "created_by" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "furlough"
            ADD "updated_by" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "info"
            ADD "image_url" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "info"
            ADD "created_by" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "info"
            ADD "updated_by" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "occupation"
            ADD "daily_rate" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "occupation"
            ADD "montly_rate" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "occupation"
            ADD "working_days_per_month" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "sub_modules"
            ADD "can_create" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "sub_modules"
            ADD "can_update" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "sub_modules"
            ADD "can_read" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "sub_modules"
            ADD "can_delete" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-07-03'
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-07-03'
        `);
        await queryRunner.query(`
            ALTER TABLE "email_blast"
            ADD CONSTRAINT "FK_d75c0aa54cacf82f69fe7be1247" FOREIGN KEY ("user_id") REFERENCES "tu_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "email_blast" DROP CONSTRAINT "FK_d75c0aa54cacf82f69fe7be1247"
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-07-02 00:00:00'
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-07-02 00:00:00'
        `);
        await queryRunner.query(`
            ALTER TABLE "sub_modules" DROP COLUMN "can_delete"
        `);
        await queryRunner.query(`
            ALTER TABLE "sub_modules" DROP COLUMN "can_read"
        `);
        await queryRunner.query(`
            ALTER TABLE "sub_modules" DROP COLUMN "can_update"
        `);
        await queryRunner.query(`
            ALTER TABLE "sub_modules" DROP COLUMN "can_create"
        `);
        await queryRunner.query(`
            ALTER TABLE "occupation" DROP COLUMN "working_days_per_month"
        `);
        await queryRunner.query(`
            ALTER TABLE "occupation" DROP COLUMN "montly_rate"
        `);
        await queryRunner.query(`
            ALTER TABLE "occupation" DROP COLUMN "daily_rate"
        `);
        await queryRunner.query(`
            ALTER TABLE "info" DROP COLUMN "updated_by"
        `);
        await queryRunner.query(`
            ALTER TABLE "info" DROP COLUMN "created_by"
        `);
        await queryRunner.query(`
            ALTER TABLE "info" DROP COLUMN "image_url"
        `);
        await queryRunner.query(`
            ALTER TABLE "furlough" DROP COLUMN "updated_by"
        `);
        await queryRunner.query(`
            ALTER TABLE "furlough" DROP COLUMN "created_by"
        `);
        await queryRunner.query(`
            ALTER TABLE "furlough" DROP COLUMN "leave_date"
        `);
        await queryRunner.query(`
            ALTER TABLE "bank_account" DROP COLUMN "updated_by"
        `);
        await queryRunner.query(`
            ALTER TABLE "bank_account" DROP COLUMN "created_by"
        `);
        await queryRunner.query(`
            ALTER TABLE "bank_account" DROP COLUMN "account_number"
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance" DROP COLUMN "total_working_days"
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance" DROP COLUMN "time_of_out"
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance" DROP COLUMN "time_of_entry"
        `);
        await queryRunner.query(`
            ALTER TABLE "tu_user" DROP COLUMN "is_active"
        `);
        await queryRunner.query(`
            ALTER TABLE "tu_user" DROP COLUMN "basic_salary"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "loan_deduction"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "bpjs_allowance"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "pph_allowance"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "pph_deduction"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "service_allowance"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "performance_allowance"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "taktis_allowance"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "health_subsidy_bpjs"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "operator_allowance"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "transportation_allowance"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "positional_allowance"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "meal_allowance"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "health_allowance"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "professional_allowance"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "total_salaries"
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries" DROP COLUMN "basic_salaries"
        `);
        await queryRunner.query(`
            ALTER TABLE "payroll" DROP COLUMN "paid_date"
        `);
        await queryRunner.query(`
            ALTER TABLE "payroll" DROP COLUMN "total_pay"
        `);
        await queryRunner.query(`
            ALTER TABLE "email_blast" DROP COLUMN "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "email_blast" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "email_blast" DROP COLUMN "email_type"
        `);
        await queryRunner.query(`
            ALTER TABLE "modules" DROP COLUMN "can_delete"
        `);
        await queryRunner.query(`
            ALTER TABLE "modules" DROP COLUMN "can_read"
        `);
        await queryRunner.query(`
            ALTER TABLE "modules" DROP COLUMN "can_update"
        `);
        await queryRunner.query(`
            ALTER TABLE "modules" DROP COLUMN "can_create"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP COLUMN "postal_code"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP COLUMN "date_of_birth"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP COLUMN "place_of_birth"
        `);
        await queryRunner.query(`
            ALTER TABLE "permission" DROP COLUMN "can_read"
        `);
        await queryRunner.query(`
            ALTER TABLE "permission" DROP COLUMN "can_delete"
        `);
        await queryRunner.query(`
            ALTER TABLE "permission" DROP COLUMN "can_update"
        `);
        await queryRunner.query(`
            ALTER TABLE "permission" DROP COLUMN "can_create"
        `);
        await queryRunner.query(`
            ALTER TABLE "absence" DROP COLUMN "updated_by"
        `);
        await queryRunner.query(`
            ALTER TABLE "absence" DROP COLUMN "created_by"
        `);
        await queryRunner.query(`
            ALTER TABLE "sub_modules"
            ADD "canRead" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "sub_modules"
            ADD "canUpdate" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "sub_modules"
            ADD "canCreate" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "sub_modules"
            ADD "canDelete" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "occupation"
            ADD "workingDaysPerMonth" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "occupation"
            ADD "montlyRate" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "occupation"
            ADD "dailyRate" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "info"
            ADD "updatedBy" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "info"
            ADD "createdBy" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "info"
            ADD "imageUrl" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "furlough"
            ADD "updatedBy" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "furlough"
            ADD "createdBy" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "furlough"
            ADD "leaveDate" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "bank_account"
            ADD "updatedBy" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "bank_account"
            ADD "createdBy" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "bank_account"
            ADD "accountNumber" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance"
            ADD "totalWorkingDays" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance"
            ADD "timeOfOut" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "attendance"
            ADD "timeOfEntry" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "tu_user"
            ADD "basicSalary" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "tu_user"
            ADD "isActive" boolean NOT NULL DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "loanDeduction" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "bpjsAllowance" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "pphAllowance" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "pphDeduction" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "serviceAllowance" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "performanceAllowance" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "taktisAllowance" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "healthSubsidyBpjs" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "operatorAllowance" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "transportationAllowance" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "positionalAllowance" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "mealAllowance" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "healthAllowance" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "professionalAllowance" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "totalSalaries" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "salaries"
            ADD "basicSalaries" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "payroll"
            ADD "paidDate" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "payroll"
            ADD "totalPay" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "email_blast"
            ADD "emailType" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "email_blast"
            ADD "userId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "email_blast"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "modules"
            ADD "canDelete" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "modules"
            ADD "canRead" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "modules"
            ADD "canUpdate" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "modules"
            ADD "canCreate" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD "postalCode" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD "dateOfBirth" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD "placeOfBirth" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "permission"
            ADD "canRead" boolean DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "permission"
            ADD "canDelete" boolean DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "permission"
            ADD "canUpdate" boolean DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "permission"
            ADD "canCreate" boolean DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "absence"
            ADD "updatedBy" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "absence"
            ADD "createdBy" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "overtime"
                RENAME COLUMN "overtime_date" TO "overtimeDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "email_blast"
            ADD CONSTRAINT "FK_03d4152eecc497a2b5f76aa5a63" FOREIGN KEY ("userId") REFERENCES "tu_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
