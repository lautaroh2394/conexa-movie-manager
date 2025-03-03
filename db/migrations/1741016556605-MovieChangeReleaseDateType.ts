import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741016556605 implements MigrationInterface {
    name = 'Migration1741016556605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie\` DROP COLUMN \`releaseDate\``);
        await queryRunner.query(`ALTER TABLE \`movie\` ADD \`releaseDate\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie\` DROP COLUMN \`releaseDate\``);
        await queryRunner.query(`ALTER TABLE \`movie\` ADD \`releaseDate\` datetime NOT NULL`);
    }

}
