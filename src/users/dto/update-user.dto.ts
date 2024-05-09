import { IsString, IsInt, IsOptional, MinLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'johndoe', description: 'The username of the User', required: false })
  @IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'fullName must be at least 3 characters long',
  })
  fullName?: string;

  @ApiProperty({ example: 21, description: 'The age of the User', required: false })
  @IsOptional()
  @IsInt()
  @Min(18, {
    message: 'the age must be a positive integer greater than 18',
  })
  age?: number;
}
