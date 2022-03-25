import {
  Controller,
  Get,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { MemberService } from './member.service';

@Controller('members')
export class MemberController {
  constructor(
    private memberService: MemberService,
  ) {}
  /**
   * List member
   * @param request
   * @returns
   */
  @Get('/')
  index(@Req() request: Request) {
    return this.memberService.list();
  }
  @Post('/:memberId/borrow')
  borrow(@Req() request: Request) {
    const memberId = request.params.memberId;
    console.log('ID', memberId);

    return this.memberService.borrowBook(
      memberId,
      request.body.bookId,
    );
  }
  @Post('/:memberId/return')
  return(@Req() request: Request) {
    const memberId = request.params.memberId;
    console.log('ID', memberId);

    return this.memberService.returnBook(
      memberId,
      request.body.bookId,
    );
  }
}
