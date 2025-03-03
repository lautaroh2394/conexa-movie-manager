import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741026827404 implements MigrationInterface {
    name = 'Migration1741026827404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hashedpassword\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`hashedPassword\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`userType\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`userType\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hashedPassword\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`hashedpassword\` varchar(255) NOT NULL`);
    }

}
