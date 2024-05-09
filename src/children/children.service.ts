import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Child } from '../models/child.entity';
import { Repository } from 'typeorm';
import { UpdateChildDto } from './dto/update-child.dto';
import { CreateChildDto } from './dto/create-child.dto';
import { UsersService } from '../users/users.service';


@Injectable()
export class ChildrenService {
    constructor(
        @InjectRepository(Child)
        private childrenRepository: Repository<Child>,
        private usersService: UsersService,
    ) { }

    async createChild(createChildDto: CreateChildDto): Promise<Child> {
        const parent = await this.usersService.findOne(createChildDto.parentId);
    
        if (!parent) {
            throw new NotFoundException(`Parent with ID "${createChildDto.parentId}" not found`);
        }
    
        const childrenCount = await this.childrenRepository.count({
            where: { parent: { id: createChildDto.parentId } },
        });
        if (childrenCount >= 5) {
            throw new BadRequestException("A parent can only have up to 5 children.");
        }
    
        const child = this.childrenRepository.create({ ...createChildDto, parent });
        return this.childrenRepository.save(child);
    }

    async findAll(): Promise<Child[]> {
        return this.childrenRepository.find(); 
    }

    async findAllByParent(parentId: number): Promise<Child[]> {
        return this.childrenRepository.find({
            where: { parent: { id: parentId } },
        });
    }

    async findOne(id: number): Promise<Child> {
        const child = await this.childrenRepository.findOneBy({ id });
        if (!child) {
          throw new NotFoundException(`Child with ID ${id} not found`);
        }
        return child;
      }
    

    async updateChild(id: number, updateChildDto: UpdateChildDto): Promise<Child> {
        const child = await this.childrenRepository.preload({
            id: id,
            ...updateChildDto,
        });
        if (!child) {
            throw new NotFoundException(`Child with ID ${id} not found`);
        }
        return this.childrenRepository.save(child);
    }

    async removeChild(id: number): Promise<void> {
        const result = await this.childrenRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Child with ID ${id} not found`);
        }
    }
}
