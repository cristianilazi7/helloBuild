import {
  Controller,
  Get,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import axios from 'axios';
import { AppService } from 'src/app.service';
import { ResponseDto } from 'src/common/dtos/response.dto';


@Controller('github')
export class GitHubController {
  constructor(private readonly appService: AppService) {}

  @Get('repositories')

  async getUserRepositories(@Req() req: Request): Promise<ResponseDto<any>> {

    const email = req.body.email;
    const user = this.appService.findUserByEmail(email);
    if (!user || !user.github_token) {
      throw new HttpException(
        'No GitHub token found. Please authorize with GitHub.',
        HttpStatus.FORBIDDEN,
      );
    }

    const query = `
        query {
          viewer {
            login
          }
        }
      `;

    try {
  
      const response = await axios.post(
        'https://api.github.com/graphql',
        { query },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${user.github_token}`,
          },
        },
      );
      const repos = response.data?.data?.viewer?.repositories?.nodes || [];

    
      return {
        success: true,
        message: 'List of repositories fetched successfully',
        data: repos,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch GitHub repositories',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

}
