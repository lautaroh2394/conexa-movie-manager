import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741015286696 implements MigrationInterface {
    name = 'Migration1741015286696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie\` ADD \`director\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`movie\` ADD \`producer\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`movie\` ADD \`releaseDate\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie\` DROP COLUMN \`releaseDate\``);
        await queryRunner.query(`ALTER TABLE \`movie\` DROP COLUMN \`producer\``);
        await queryRunner.query(`ALTER TABLE \`movie\` DROP COLUMN \`director\``);
    }

}
