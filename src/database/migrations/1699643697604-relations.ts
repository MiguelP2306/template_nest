import { MigrationInterface, QueryRunner } from 'typeorm';

export class Relations1699643697604 implements MigrationInterface {
  name = 'Relations1699643697604';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`productId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_e48ea2bb8f66bb4dc33dfda517\` (\`productId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_e48ea2bb8f66bb4dc33dfda517\` ON \`user\` (\`productId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_e48ea2bb8f66bb4dc33dfda5171\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_e48ea2bb8f66bb4dc33dfda5171\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_e48ea2bb8f66bb4dc33dfda517\` ON \`user\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP INDEX \`IDX_e48ea2bb8f66bb4dc33dfda517\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`productId\``);
  }
}
