import { Test, TestingModule } from '@nestjs/testing';
import { AnnouncmentsController } from './map';

describe('AnnouncmentsController', () => {
  let controller: AnnouncmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnouncmentsController],
    }).compile();

    controller = module.get<AnnouncmentsController>(AnnouncmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
