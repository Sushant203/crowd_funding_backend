import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCampaignService } from './update-campaign.service';

describe('UpdateCampaignService', () => {
  let service: UpdateCampaignService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateCampaignService],
    }).compile();

    service = module.get<UpdateCampaignService>(UpdateCampaignService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
