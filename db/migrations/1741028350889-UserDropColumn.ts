import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741028350889 implements MigrationInterface {
    name = 'Migration1741028350889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`userType\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`userType\` varchar(255) NOT NULL`);
    }

}
