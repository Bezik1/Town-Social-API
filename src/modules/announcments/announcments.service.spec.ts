import { Test, TestingModule } from '@nestjs/testing';
import { AnnouncmentsService } from './announcments.service';

describe('AnnouncmentsService', () => {
  let service: AnnouncmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnnouncmentsService],
    }).compile();

    service = module.get<AnnouncmentsService>(AnnouncmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
