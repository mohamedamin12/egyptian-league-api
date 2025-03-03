import { Controller, Get, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('auth')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  //* Post: ~/auth/register
  @Post('register')
  registerUser(@Body() body: RegisterAdminDto) {
    return this.adminService.register(body);
  }

  //* Post: ~/auth/login
  @Post('login')
  loginUser(@Body() body: LoginAdminDto) {
    return this.adminService.login(body);
  }
}
