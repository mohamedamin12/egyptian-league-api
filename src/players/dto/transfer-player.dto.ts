import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class TransferPlayerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Player's new team ID" })
  newTeamId: string;
}
