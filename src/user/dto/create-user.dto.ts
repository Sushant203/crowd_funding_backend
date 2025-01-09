import { IsDate, IsEmail, IsEnum, IsInt, IsString } from "class-validator";
import { userType } from "./userRole";

export class CreateUserDto {
    @IsString()
    fullname: string

    @IsString()
    address: string

    @IsDate()
    DOB: Date

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsEnum(userType)
    role: userType

    @IsString()
    profile_picture: string
}
