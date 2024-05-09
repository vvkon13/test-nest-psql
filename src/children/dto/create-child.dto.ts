import { IsString, IsInt, Min, Max, MinLength, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChildDto {
  @ApiProperty({
    example: 'bob',
    description: 'The username of the child',
  })
  @IsString()
  @MinLength(3, {
    message: 'Full name must be at least 3 characters.',
  })
  fullName: string;

  @ApiProperty({ example: 11, description: 'The age of the child' })
  @IsInt()
  @Min(0)
  @Max(17, {
    message: 'Age must be a positive integer and cannot exceed 17.',
  })
  age: number;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the user',
  })
  @IsInt()
  @IsPositive()
  parentId: number;
}
