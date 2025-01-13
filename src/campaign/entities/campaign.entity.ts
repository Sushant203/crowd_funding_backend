import { Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { campaignStatus } from "../dto/campaignStatus";
import { User } from "src/user/entities/user.entity";

export class Campaign {
    @PrimaryGeneratedColumn()
    campaign_id: number

    @Column()
    campaign_title: string

    @Column()
    cmapaign_description: string

    @Column()
    targetAmount: BigInt

    @Column()
    start_date: Date

    @Column()
    end_date: Date

    @Column({ type: 'enum', enum: campaignStatus })
    role: campaignStatus

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;




}
