import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "The team's name" })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "The team's stadium" })
  stadium: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "The team's shirt color" })
  shirtColor: string;
}
