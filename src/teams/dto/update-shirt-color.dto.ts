import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateShirtColorDto {
  @IsString()
  @IsNotEmpty()
  color: string;
}

