import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { userType } from "../dto/userRole";

export class User {
    @PrimaryGeneratedColumn()
    user_id: number

    @Column()
    fullname: string

    @Column()
    address: string

    @Column()
    DOB: Date

    @Column()
    email: string

    @Column()
    password: string

    @Column({ type: 'enum', enum: userType })
    role: userType

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;


}
