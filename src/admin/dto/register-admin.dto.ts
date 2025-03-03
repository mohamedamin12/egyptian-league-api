import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator";

export class RegisterAdminDto {
  @IsString()
  @IsNotEmpty()
  @Length(2 , 150)
  @ApiProperty({ description: "enter username"})
  username: string;

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
