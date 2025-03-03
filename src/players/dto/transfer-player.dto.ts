import { IsString, IsNotEmpty } from 'class-validator';

export class TransferPlayerDto {
  @IsString()
  @IsNotEmpty()
  newTeamId: string;
}
