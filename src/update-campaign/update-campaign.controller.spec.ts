import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCampaignController } from './update-campaign.controller';
import { UpdateCampaignService } from './update-campaign.service';

describe('UpdateCampaignController', () => {
  let controller: UpdateCampaignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateCampaignController],
      providers: [UpdateCampaignService],
    }).compile();

    controller = module.get<UpdateCampaignController>(UpdateCampaignController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
