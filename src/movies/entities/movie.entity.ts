import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['name', 'releaseDate', 'director'])
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ length: 600})
    description: string;

    @Column()
    director: string;

    @Column()
    producer: string;

    @Column()
    releaseDate: string;
}