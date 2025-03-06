import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { ResponseService } from 'src/common/response/response.service';
import { ResponseDto } from 'src/common/dtos/response.dto';
import { AuthRequestDto } from '../app/dtos/auth/auth-request.dto';
import { AuthResponseDto } from '../app/dtos/auth/auth-response.dto';
import { AppService, User } from 'src/app.service';
import { RegisterUserRequestDto } from '../app/dtos/user/register-user-request.dto';
import { UpdateGithubTokenDto } from '../app/dtos/auth/auth-tokengithub-request.dto';
import axios from 'axios';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly appService: AppService,
    private readonly responseService: ResponseService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: AuthRequestDto,
  ): Promise<ResponseDto<AuthResponseDto>> {
    try {
      const result = await this.appService.login(body.email, body.password);
      return this.responseService.success(
        'User logged in successfully',
        result,
      );
    } catch (error) {
      const errorCode = error.status || HttpStatus.UNAUTHORIZED;
      throw new HttpException(
        this.responseService.error('Invalid email or password', errorCode),
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() body: RegisterUserRequestDto,
  ): Promise<ResponseDto<AuthResponseDto>> {
    try {
      const result = await this.appService.registerUser(
        body.email,
        body.password,
        body.name,
      );

      return this.responseService.success(
        'User registered successfully',
        result,
      );
    } catch (error) {
      const errorCode = error.status || HttpStatus.BAD_REQUEST;
      throw new HttpException(
        this.responseService.error('Registration failed', errorCode),
        errorCode,
      );
    }
  }

  @Patch('github/code')
  @HttpCode(HttpStatus.OK)
  async updateGithubToken(
    @Body() body: UpdateGithubTokenDto,
  ): Promise<ResponseDto<Partial<Omit<User, 'id'>>>> {
    try {

      const { data } = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: body.githubToken,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

    
      if (!data.access_token) {
        throw new HttpException(
          'Failed to retrieve access token from GitHub',
          HttpStatus.BAD_REQUEST,
        );
      }

    
      const updatedUser = this.appService.updateUser(body.id, {
        github_token: data.access_token,
      });

      return this.responseService.success(
        'GitHub token updated successfully',
        updatedUser,
      );
    } catch (error) {
      const errorCode = error.status || HttpStatus.BAD_REQUEST;
      throw new HttpException(
        this.responseService.error('Failed to update GitHub token', errorCode),
        errorCode,
      );
    }
  }

  
}
