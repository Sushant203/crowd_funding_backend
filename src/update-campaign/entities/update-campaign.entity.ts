import { Campaign } from "src/campaign/entities/campaign.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class UpdateCampaign {
    @PrimaryGeneratedColumn()
    update_id: number

    @Column()
    updatedTitle: string

    @Column()
    updatedContent: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    //realtion with campaign table
    @OneToOne(() => Campaign, (campaign) => campaign.updatecampaign)
    campaign: Campaign
}
