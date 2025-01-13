import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateUpdateCampaignDto {
    @IsNumber()
    campaign_id: number

    @IsString()
    updatedTitle: string

    @IsString()
    updatedContent: string


}
