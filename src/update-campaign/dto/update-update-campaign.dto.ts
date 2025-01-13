import { PartialType } from '@nestjs/mapped-types';
import { CreateUpdateCampaignDto } from './create-update-campaign.dto';

export class UpdateUpdateCampaignDto extends PartialType(CreateUpdateCampaignDto) {}
