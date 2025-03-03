import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginAdminDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({ description: "enter the email"})
  email:string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ description: "enter the password"})
  password: string;
}