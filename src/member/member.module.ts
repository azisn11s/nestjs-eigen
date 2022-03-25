import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import moment from 'moment';

@Module({
  controllers: [MemberController],
  providers: [
    MemberService,
    {
      provide: 'MomentWrapper',
      useValue: moment,
    },
  ],
})
export class MemberModule {}
