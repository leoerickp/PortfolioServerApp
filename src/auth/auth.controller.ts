import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/inputs/signup.dto';
import { AuthResponse } from './types/AuthResponse.type';
import { LoginDto } from './dto/inputs/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './decorators/current-user/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async signUp(
    @Body() signUpDto: SignUpDto
  ): Promise<AuthResponse> {
    return await this.authService.signUp(signUpDto);
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto
  ): Promise<AuthResponse> {
    return await this.authService.login(loginDto);
  }

  @Get()
  @UseGuards(/*AuthGuard()*/JwtAuthGuard)
  revalidateToken(
    @CurrentUser() user: User
  ): AuthResponse {

    return this.authService.revalidateToken(user);
  }


}
