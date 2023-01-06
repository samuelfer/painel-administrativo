import { IsNotEmpty, Length } from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @Length(3, 255)
    name: string;

    @Column()
    @IsNotEmpty()
    @Length(3, 255)
    description: string;

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp",
    })
    createdAt: Date;
}
