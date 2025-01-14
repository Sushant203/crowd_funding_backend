import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { userType } from "../dto/userRole";
import { Campaign } from "src/campaign/entities/campaign.entity";
import { Payment } from "src/payment/entities/payment.entity";

@Entity()
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

    //relation to campaign table
    @OneToMany(() => Campaign, (campaign) => campaign.user)
    campaign: Campaign;

    //relation with payment table
    @OneToMany(() => Payment, (payment) => payment.user)
    @JoinColumn()
    payment: Payment

}
