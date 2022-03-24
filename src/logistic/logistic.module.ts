import { Module } from '@nestjs/common';
import { LogisticService } from './logistic.service';
import { LogisticController } from './logistic.controller';

@Module({
  providers: [LogisticService],
  controllers: [LogisticController],
})
export class LogisticModule {}
