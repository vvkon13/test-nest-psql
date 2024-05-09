import { IsString, IsInt, Min, Max, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateChildDto {
  @ApiProperty({
    example: 'bob',
    description: 'The username of the child',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'Full name must be at least 3 characters.',
  })
  fullName?: string;

  @ApiProperty({ example: 11, description: 'The age of the child', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(17, {
    message: 'Age must be a positive integer and cannot exceed 17.',
  })
  age?: number;
}
