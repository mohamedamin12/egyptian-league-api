import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class UpdateSalaryDto {
  @IsInt()
  @IsPositive()
  @ApiProperty({ description: "update player salary" })
  salary: number;
}

