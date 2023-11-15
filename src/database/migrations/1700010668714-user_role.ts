import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRole1700010668714 implements MigrationInterface {
    name = 'UserRole1700010668714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` enum ('0', '1', '2') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    }

}
