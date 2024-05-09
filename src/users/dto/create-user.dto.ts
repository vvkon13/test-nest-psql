import { IsString, IsInt, MinLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe', description: 'The username of the User' })
  @IsString()
  @MinLength(3, {
    message: 'fullName must be at least 3 characters long',
  })
  fullName: string;

  @ApiProperty({ example: 21, description: 'The age of the User' })
  @IsInt()
  @Min(18, {
    message: 'the age must be a positive integer greater than 18',
  })
  age: number;

}
