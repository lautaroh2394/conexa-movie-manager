import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserType } from "../types";
import { Role } from "src/auth/roles.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    username: string;

    @Column()
    hashedPassword: string;

    @Column('json', {nullable: true})
    roles: Role[] = [];
}