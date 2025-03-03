import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsPositive, IsEnum } from 'class-validator';
import { PlayerPosition } from 'utils/enum';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Player's name" })
  name: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({ description: "Player's age" })
  age: number;

  @IsNotEmpty()
  @IsEnum(PlayerPosition, { message: 'Invalid position. Must be one of Goalkeeper, Defender, Midfielder, Forward' })
  @ApiProperty({ description: "Player's position" })
  position: PlayerPosition;

  @IsInt()
  @IsPositive()
  @ApiProperty({ description: "Player's salary" })
  salary: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Player's team ID" })
  teamId: string;
}
