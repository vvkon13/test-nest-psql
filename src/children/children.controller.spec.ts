import { Test, TestingModule } from '@nestjs/testing';
import { ChildrenController } from './children.controller';
import { ChildrenService } from './children.service';
import { CreateChildDto, UpdateChildDto } from './dto';

describe('ChildrenController', () => {
  let controller: ChildrenController;
  let service: ChildrenService;

  beforeEach(async () => {
    const childrenServiceMock = {
      createChild: jest.fn(dto => Promise.resolve({ id: Date.now(), ...dto })),
      findAll: jest.fn().mockResolvedValue([{id: 1}, {id: 2}]),
      findOne: jest.fn(id => Promise.resolve({ id })),
      findAllByParent: jest.fn(parentId => Promise.resolve([{ parentId }, { parentId }])),
      updateChild: jest.fn((id, dto) => Promise.resolve({ id, ...dto })),
      removeChild: jest.fn(id => Promise.resolve({ id })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChildrenController],
      providers: [
        {
          provide: ChildrenService,
          useValue: childrenServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ChildrenController>(ChildrenController);
    service = module.get<ChildrenService>(ChildrenService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createChild', () => {
    it('should create a child', async () => {
      const createChildDto: CreateChildDto = { fullName: 'Test Child', age: 5, parentId: 1 };
      expect(await controller.createChild(createChildDto)).toEqual({ id: expect.any(Number), ...createChildDto });
      expect(service.createChild).toHaveBeenCalledWith(createChildDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of children', async () => {
      expect(await controller.findAll()).toHaveLength(2);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single child', async () => {
      const id = 1;
      expect(await controller.findOne(id.toString())).toEqual({ id });
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('findAllByParent', () => {
    it('should return children by parentId', async () => {
      const parentId = 1;
      expect(await controller.findAllByParent(parentId.toString())).toEqual([{ parentId }, { parentId }]);
      expect(service.findAllByParent).toHaveBeenCalledWith(parentId);
    });
  });

  describe('update', () => {
    it('should update a child', async () => {
      const updateChildDto: UpdateChildDto = { fullName: 'Updated Child' };
      const id = 1;
      expect(await controller.update(id.toString(), updateChildDto)).toEqual({ id, ...updateChildDto });
      expect(service.updateChild).toHaveBeenCalledWith(id, updateChildDto);
    });
  });

  describe('remove', () => {
    it('should remove a child', async () => {
      const id = 1;
      expect(await controller.remove(id.toString())).toEqual({ id });
      expect(service.removeChild).toHaveBeenCalledWith(id);
    });
  });
});
