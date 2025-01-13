import { Column, CreateDateColumn, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { paymentMethod } from "../dto/paymentMethod";
import { User } from "src/user/entities/user.entity";
import { Campaign } from "src/campaign/entities/campaign.entity";

export class Payment {
    @PrimaryGeneratedColumn()
    payment_id: number

    @Column({ type: 'bigint' })
    donatedAmount: bigint

    @Column({ type: 'enum', enum: paymentMethod })
    paymentMethod: paymentMethod

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    //relation with user table
    @ManyToOne(() => User, (user) => user.payment)
    @JoinColumn()
    user: User

    //relation with campaign table
    @ManyToOne(() => Campaign, (campaign) => campaign.payment)
    @JoinColumn()
    campaign: Campaign
}
