import { IsString } from "class-validator";

export class CreateUpdateCampaignDto {
    @IsString()
    updatedTitle: string

    @IsString()
    updatedContent: string


}
