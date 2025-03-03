import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741031072081 implements MigrationInterface {
    name = 'Migration1741031072081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_619b8b91931fccd03a4ce10382\` ON \`movie\` (\`name\`, \`releaseDate\`, \`director\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_619b8b91931fccd03a4ce10382\` ON \`movie\``);
    }
}
