import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    director: string;

    @Column()
    producer: string;

    @Column()
    releaseDate: string;
}