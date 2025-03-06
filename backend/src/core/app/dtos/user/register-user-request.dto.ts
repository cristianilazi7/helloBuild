import {
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
export class RegisterUserRequestDto {
  @IsOptional()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
