import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Admin } from './entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { JwtPayloadType } from 'utils/types';
import { LoginAdminDto } from './dto/login-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly userRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) { }

/**
 * register admin user
 * @param registerAdmin register admin user
 * @returns new user and token  
*/
  async register(registerAdmin: RegisterAdminDto) {
    const { username, email, password } = registerAdmin;

    const user = await this.userRepository.findOne({ where: { email } });
    if (user) throw new BadRequestException('User already exists');

    const hashedPassword = await this.hashedPassword(password);
    const newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);

    const token = await this.generateJwt({
      id: newUser.id,
      email: newUser.email,
    });

    return { newUser, token };
  }

  async login(loginUser: LoginAdminDto) {
    const { email, password } = loginUser;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new BadRequestException('invalid email or password');

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw new BadRequestException('invalid email or password');

    const token = await this.generateJwt({
      id: user.id,
      email: user.email,
    });

    return { user, token };
  }

/**
 * hashed password
 * @param password password hashed fro user
 */
  public async hashedPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

/**
* generate JWT token
* @param payload jwt token
* @returns token
*/
  private generateJwt(payload: JwtPayloadType) {
    return this.jwtService.signAsync(payload);
  }
}
