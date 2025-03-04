import { Role } from "src/auth/constants";
import { User } from "src/users/entities/user.entity";
import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcrypt'
export class CreateUsers1741037543552 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const adminUser = await queryRunner.manager.create(User, {
            username: 'admin',
            hashedPassword: bcrypt.hashSync('1234', 1),
            roles: [Role.ADMIN]
        })
        await queryRunner.manager.save(adminUser)

        const regularUser = await queryRunner.manager.create(User, {
            username: 'regularuser',
            hashedPassword: bcrypt.hashSync('1234', 1),
            roles: [Role.REGULAR_USER]
        })
        await queryRunner.manager.save(regularUser)

        const masterUser = await queryRunner.manager.create(User, {
            username: 'master',
            hashedPassword: bcrypt.hashSync('1234', 1),
            roles: [Role.REGULAR_USER, Role.ADMIN]
        })
        await queryRunner.manager.save(masterUser)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
