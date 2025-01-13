import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { campaignStatus } from "../dto/campaignStatus";
import { User } from "src/user/entities/user.entity";
import { UpdateCampaign } from "src/update-campaign/entities/update-campaign.entity";

@Entity()
export class Campaign {
    @PrimaryGeneratedColumn()
    campaign_id: number

    @Column()
    campaign_title: string

    @Column()
    campaign_description: string

    @Column({ type: 'bigint' })
    targetAmount: number;

    @Column({ type: 'date' }) // Ensuring 'date' type is explicitly specified
    start_date: Date;

    @Column({ type: 'date' })
    end_date: Date;

    @Column({ type: 'enum', enum: campaignStatus })
    status: campaignStatus

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;


    //raltion with user table
    @ManyToOne(() => User, (user) => user.campaign)
    user: User

    //relation with updateCampaign table
    @OneToOne(() => UpdateCampaign, (updatecampaign) => updatecampaign.campaign)
    updatecampaign: UpdateCampaign
}
