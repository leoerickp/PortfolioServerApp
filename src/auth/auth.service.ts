import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';
import { SignUpDto } from './dto/inputs/signup.dto';
import { AuthResponse } from './types/AuthResponse.type';
import { LoginDto } from './dto/inputs/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  getJwtToken(userId: string) {
    return this.jwtService.sign({ id: userId });
  }

  async signUp(signUpDto: SignUpDto): Promise<AuthResponse> {
    const user = await this.usersService.create(signUpDto);
    const token = this.getJwtToken(user._id);
    return { token, user };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;
    const user = await this.usersService.findOneByEmail(email);
    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Email / Password do not match');
    }

    const token = this.getJwtToken(user._id);
    return { token, user }
  }

  revalidateToken(user: User): AuthResponse {
    const token = this.getJwtToken(user._id);
    return { token, user }
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.usersService.findOne(id);

    if (!user.isActive)
      throw new UnauthorizedException(`Use is inactive, talk with an admin`);

    delete user.password;

    return user;
  }
}
