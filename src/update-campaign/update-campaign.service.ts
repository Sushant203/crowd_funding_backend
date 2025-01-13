import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUpdateCampaignDto } from './dto/create-update-campaign.dto';
import { UpdateUpdateCampaignDto } from './dto/update-update-campaign.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCampaign } from './entities/update-campaign.entity';
import { Repository } from 'typeorm';
import { Campaign } from 'src/campaign/entities/campaign.entity';

@Injectable()
export class UpdateCampaignService {
  constructor(
    @InjectRepository(UpdateCampaign)
    private updateCampaignRepository: Repository<UpdateCampaign>,
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>

  ) { }
  //create method
  async create(createUpdateCampaignDto: CreateUpdateCampaignDto): Promise<UpdateCampaign> {
    const checkCampaign = await this.campaignRepository.findOne({ where: { campaign_id: createUpdateCampaignDto.campaign_id } })
    if (!checkCampaign) {
      throw new NotFoundException("campaign not found");
    }

    const updateCampaignData = this.updateCampaignRepository.create({
      ...createUpdateCampaignDto,
      campaign: checkCampaign
    })
    return this.updateCampaignRepository.save(updateCampaignData);
  }

  // findall method 

  async findAll(): Promise<UpdateCampaign[]> {
    return this.updateCampaignRepository.find({ relations: ['campaign'] });
  }

  //finding a single update by id 
  async findOne(update_id: number): Promise<UpdateCampaign> {
    const checkCampaignUpdate = await this.updateCampaignRepository.findOne({
      where: { update_id },
      relations: ['campaign'],
    });
    if (!checkCampaignUpdate) {
      throw new NotFoundException('campaign update not found');
    }
    return checkCampaignUpdate;
  }


  //update method

  async update(update_id: number, updateUpdateCampaignDto: UpdateUpdateCampaignDto): Promise<UpdateCampaign> {
    const checkCampaign = await this.campaignRepository.findOne({ where: { campaign_id: updateUpdateCampaignDto.campaign_id } })
    if (!checkCampaign) {
      throw new NotFoundException("campaign not found");
    }

    // Check if the update campaign exists
    const checkCampaignUpdate = await this.updateCampaignRepository.findOne({
      where: { update_id },
      relations: ['campaign'],
    });
    if (!checkCampaignUpdate) {
      throw new NotFoundException('campaign update not found');
    }
    // Update the existing entity
    checkCampaignUpdate.updatedTitle = updateUpdateCampaignDto.updatedTitle;
    checkCampaignUpdate.updatedContent = updateUpdateCampaignDto.updatedContent;
    checkCampaignUpdate.campaign = checkCampaign;

    return this.updateCampaignRepository.save(checkCampaignUpdate);

  }

  //remove method

  async remove(update_id: number): Promise<void> {
    const checkCampaignUpdate = await this.updateCampaignRepository.findOne({ where: { update_id } });
    if (!checkCampaignUpdate) {
      throw new NotFoundException('campaign update not found');
    }
    await this.updateCampaignRepository.remove(checkCampaignUpdate);
  }
}
