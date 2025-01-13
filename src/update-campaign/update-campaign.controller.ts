import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UpdateCampaignService } from './update-campaign.service';
import { CreateUpdateCampaignDto } from './dto/create-update-campaign.dto';
import { UpdateUpdateCampaignDto } from './dto/update-update-campaign.dto';

@Controller('update-campaign')
export class UpdateCampaignController {
  constructor(private readonly updateCampaignService: UpdateCampaignService) { }

  @Post()
  create(@Body() createUpdateCampaignDto: CreateUpdateCampaignDto) {
    return this.updateCampaignService.create(createUpdateCampaignDto);
  }

  @Get()
  findAll() {
    return this.updateCampaignService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.updateCampaignService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUpdateCampaignDto: UpdateUpdateCampaignDto) {
    return this.updateCampaignService.update(+id, updateUpdateCampaignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.updateCampaignService.remove(+id);
  }
}
