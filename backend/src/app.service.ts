import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BcryptService } from './common/security/bcrypt.service';
import { JwtService } from '@nestjs/jwt';

export interface User {
  id: number;
  email: string;
  password: string;
  github_token: string;
  github_code:string;
  name?: string;
}

@Injectable()
export class AppService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  private users: User[] = [];

  getHello(): string {
    return 'Hello World!';
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = this.findUserByEmail(email);

    if (!user) return null;

    const isPasswordMatching = await this.bcryptService.compare(
      password,
      user.password,
    );

    if (!isPasswordMatching) return null;

    return user;
  }

  async registerUser(email: string, password: string, name?: string) {
 
    if (this.findUserByEmail(email)) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.bcryptService.hash(
      password,
    );

    const newUser: User = {
      id: this.users.length + 1,
      email,
      password: hashedPassword,
      github_token: '',
      github_code: '',
      name: name || '',
    };

    const payload = { sub: newUser.id, email: newUser.email };
  

    this.users.push(newUser);
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    };;
  }

  updateUser(id: number, updateData: Partial<Omit<User, 'id'>>):Partial<User> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateData.email && updateData.email !== user.email) {
      if (this.findUserByEmail(updateData.email)) {
        throw new NotFoundException('Email already in use');
      }
    }

    Object.assign(user, updateData);
    const { password, ...rest } = user;
    return rest;
  }

  findUserByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }


  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }


}
