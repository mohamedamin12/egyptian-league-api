import { IsNotEmpty, IsString, IsInt, IsPositive } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsPositive()
  age: number;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsInt()
  @IsPositive()
  salary: number;

  @IsString()
  @IsNotEmpty()
  teamId: string;
}
