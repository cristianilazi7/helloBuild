import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SHA512 } from 'crypto-js';
@Injectable()
export class BcryptService {
  private readonly saltRounds: number;
  private readonly salt: string;

  constructor(private readonly configService: ConfigService) {
    this.saltRounds = 10;
    this.salt = this.configService.get<string>('SALT', 'default_salt');
  }

  async hash(password: string): Promise<string> {
    return SHA512(this.salt + password).toString();
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const hashedPassword = SHA512(this.salt + password).toString();
    return hashedPassword === hash;
  }
}
