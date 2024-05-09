import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';
import { User } from '../models/user.entity';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiCreatedResponse,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiCreatedResponse({
        description: 'The user has been successfully created',
        type: User,
      }) 
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Return all users' })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by id' })
    @ApiResponse({ status: 200, description: 'Return user by id' })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update user by id' })
    @ApiCreatedResponse({
        description: 'The user has been successfully updated',
        type: User,
      }) 
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user by id' })
    @ApiResponse({ status: 200, description: 'Delete user by id' })
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}

