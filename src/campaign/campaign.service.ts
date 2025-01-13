import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from './entities/campaign.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }
  async create(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    const user = await this.userRepository.findOne({ where: { user_id: createCampaignDto.user_id } });
    if (!user) {
      throw new NotFoundException("user not found");
    }
    const campaignData = await this.campaignRepository.create({
      ...createCampaignDto,
      user: user
    });
    return this.campaignRepository.save(campaignData);
  }

  async findAll(): Promise<Campaign[]> {
    return this.campaignRepository.find({ relations: ['user'] });
  }

  async findOne(campaign_id: number): Promise<Campaign> {
    const campaignAvailable = await this.campaignRepository.findOne({ where: { campaign_id } })
    if (!campaignAvailable) {
      throw new NotFoundException("campaign not found");
    }
    return campaignAvailable;
  }

  async update(campaign_id: number, updateCampaignDto: UpdateCampaignDto): Promise<Campaign> {
    const userAvailable = await this.userRepository.findOne({ where: { user_id: updateCampaignDto.user_id } });
    if (!userAvailable) {
      throw new NotFoundException("user not found");
    }

    const campaignAvailable = await this.campaignRepository.findOne({ where: { campaign_id } })
    // console.log("id:", campaign_id);
    if (!campaignAvailable) {
      throw new NotFoundException("campaign not found");
    }

    const updatedCampaignData = await this.campaignRepository.create({
      user: userAvailable,
      ...campaignAvailable,
      ...updateCampaignDto
    })

    return this.campaignRepository.save(updatedCampaignData);
  }

  async remove(campaign_id: number): Promise<void> {
    const campaignAvailable = await this.campaignRepository.findOne({ where: { campaign_id } })
    if (!campaignAvailable) {
      throw new NotFoundException("campaign not found");
    }
    await this.campaignRepository.remove(campaignAvailable);
  }
}
