import { Module } from '@nestjs/common';
import { UpdateCampaignService } from './update-campaign.service';
import { UpdateCampaignController } from './update-campaign.controller';

@Module({
  controllers: [UpdateCampaignController],
  providers: [UpdateCampaignService],
})
export class UpdateCampaignModule {}
