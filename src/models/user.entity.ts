import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Child } from './child.entity';

@Entity()
export class User {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the user',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'johndoe',
    description: 'The username of the user',
  })
  @Column({ length: 500 })
  fullName: string;

  @ApiProperty({ example: 21, description: 'The age of the user' })
  @Column('int')
  age: number;

  @ApiProperty({
    type: () => [Child], 
    description: 'The list of children of this user ',
  })
  @OneToMany(() => Child, (child) => child.parent)
  children: Child[];
  
}
