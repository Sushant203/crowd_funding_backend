import { IsDecimal, IsEnum, IsInt, IsNumber } from "class-validator";
import { paymentMethod } from "./paymentMethod";

export class CreatePaymentDto {
    @IsInt()
    user_id: number

    @IsInt()
    campaign_id: number

    @IsDecimal()
    donatedAmount: number

    @IsEnum(paymentMethod)
    paymentMethod: paymentMethod
}
