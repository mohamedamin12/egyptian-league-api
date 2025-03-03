import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateShirtColorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: "Color to update the team's shirt color"})
  color: string;
}

