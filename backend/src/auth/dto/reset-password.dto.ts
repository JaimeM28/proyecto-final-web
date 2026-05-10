import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'juan@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
  })
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: 'NuevaPassword123',
    minLength: 8,
  })
  @MinLength(8)
  newPassword: string;
}
