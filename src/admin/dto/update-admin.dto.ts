import { PartialType } from '@nestjs/swagger';
import { RegisterAdminDto } from './register-admin.dto';

export class UpdateAdminDto extends PartialType(RegisterAdminDto) {}
