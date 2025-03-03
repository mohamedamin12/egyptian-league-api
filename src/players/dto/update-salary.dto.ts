import { IsInt, IsPositive } from 'class-validator';

export class UpdateSalaryDto {
  @IsInt()
  @IsPositive()
  salary: number;
}

