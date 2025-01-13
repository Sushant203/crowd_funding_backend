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

  findAll() {
    return `This action returns all campaign`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campaign`;
  }

  update(id: number, updateCampaignDto: UpdateCampaignDto) {
    return `This action updates a #${id} campaign`;
  }

  remove(id: number) {
    return `This action removes a #${id} campaign`;
  }
}
