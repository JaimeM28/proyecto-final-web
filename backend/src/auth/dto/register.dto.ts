// auth/dto/register.dto.ts
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength, ValidateIf } from 'class-validator';
import { UserRole } from '../../users/enums/user-role.enum';

export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsEnum(UserRole)
  role: UserRole;

  @ValidateIf((dto) => dto.role === UserRole.PROVIDER)
  @IsNotEmpty()
  trade?: string;

  @IsNotEmpty()
  location: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}