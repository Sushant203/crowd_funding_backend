import { IsDateString, IsEnum, IsInt, IsString } from "class-validator";
import { campaignStatus } from "./campaignStatus";


export class CreateCampaignDto {
    @IsInt()
    user_id: number

    @IsString()
    campaignTitle: string

    @IsString()
    campaignDescription: string

    @IsInt()
    targetAmount: number

    @IsDateString()
    start_date: Date

    @IsDateString()
    end_date: Date

    @IsEnum({ campaignStatus })
    status: campaignStatus

}
