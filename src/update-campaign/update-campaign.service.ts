import { Injectable } from '@nestjs/common';
import { CreateUpdateCampaignDto } from './dto/create-update-campaign.dto';
import { UpdateUpdateCampaignDto } from './dto/update-update-campaign.dto';

@Injectable()
export class UpdateCampaignService {
  create(createUpdateCampaignDto: CreateUpdateCampaignDto) {
    return 'This action adds a new updateCampaign';
  }

  findAll() {
    return `This action returns all updateCampaign`;
  }

  findOne(id: number) {
    return `This action returns a #${id} updateCampaign`;
  }

  update(id: number, updateUpdateCampaignDto: UpdateUpdateCampaignDto) {
    return `This action updates a #${id} updateCampaign`;
  }

  remove(id: number) {
    return `This action removes a #${id} updateCampaign`;
  }
}
