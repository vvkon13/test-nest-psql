import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity()
export class Child {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the child',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'bob',
    description: 'The username of the child',
  })
  @Column({ length: 500 })
  fullName: string;

  @ApiProperty({ example: 11, description: 'The age of the child' })
  @Column('int')
  age: number;

  @ManyToOne(type => User, user => user.children)
  parent: User;
}
