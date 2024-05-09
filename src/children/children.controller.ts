import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CreateChildDto, UpdateChildDto } from './dto';
import { ChildrenService } from './children.service';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiCreatedResponse,
} from '@nestjs/swagger';
import { Child } from '../models/child.entity';

@ApiTags('children')
@Controller('children')
export class ChildrenController {
    constructor(private readonly childrenService: ChildrenService) { }

    @Post()
    @ApiOperation({ summary: 'Create child' })
    @ApiCreatedResponse({
        description: 'The child has been successfully created',
        type: Child,
      }) 
    createChild(@Body() createChildDto: CreateChildDto) {
        return this.childrenService.createChild(createChildDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all children' })
    @ApiResponse({ status: 200, description: 'Return all children' })
    findAll() {
        return this.childrenService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get child by id' })
    @ApiResponse({ status: 200, description: 'Return child by id' })
    findOne(@Param('id') id: string) {
        return this.childrenService.findOne(+id);
    }

    @Get('by-parent/:parentId')
    @ApiOperation({ summary: 'Get a list of the users children by their id' })
    @ApiResponse({ status: 200, description: 'Return a list of the users children by their id' })
    findAllByParent(@Param('parentId') parentId: string) {
        return this.childrenService.findAllByParent(+parentId);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update child by id' })
    @ApiCreatedResponse({
        description: 'The child has been successfully updated',
        type: Child,
      }) 
    update(@Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
        return this.childrenService.updateChild(+id, updateChildDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete child by id' })
    @ApiResponse({ status: 200, description: 'Delete child by id' })
    remove(@Param('id') id: string) {
        return this.childrenService.removeChild(+id);
    }
}

