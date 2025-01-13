import { Module } from '@nestjs/common';
import { UpdateCampaignService } from './update-campaign.service';
import { UpdateCampaignController } from './update-campaign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateCampaign } from './entities/update-campaign.entity';
import { Campaign } from 'src/campaign/entities/campaign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UpdateCampaign, Campaign])],
  controllers: [UpdateCampaignController],
  providers: [UpdateCampaignService],
})
export class UpdateCampaignModule { }
