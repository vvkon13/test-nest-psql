import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService; 

  beforeEach(async () => {
    const appServiceMock = {
      getHello: jest.fn().mockReturnValue('Hello Test!'),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: appServiceMock }],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return "Hello Test!"', () => {
      expect(appController.getHello()).toBe('Hello Test!');
      expect(appService.getHello).toHaveBeenCalled();
    });
  });
});
