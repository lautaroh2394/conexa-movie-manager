import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741033127699 implements MigrationInterface {
    name = 'Migration1741033127699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`movie\` ADD \`description\` varchar(600) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`movie\` ADD \`description\` varchar(255) NOT NULL`);
    }

}
