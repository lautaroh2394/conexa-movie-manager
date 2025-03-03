import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741027843041 implements MigrationInterface {
    name = 'Migration1741027843041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hashedpassword\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`hashedPassword\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`roles\` json NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roles\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hashedPassword\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`hashedpassword\` varchar(255) NOT NULL`);
    }

}
