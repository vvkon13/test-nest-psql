import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildrenController } from './children.controller';
import { ChildrenService } from './children.service';
import { UsersModule } from '../users/users.module'; 
import { Child } from '../models/child.entity';

@Module({
  imports: [
    UsersModule, 
    TypeOrmModule.forFeature([Child]), 
  ],
  controllers: [ChildrenController],
  providers: [ChildrenService],
})
export class ChildrenModule {}

