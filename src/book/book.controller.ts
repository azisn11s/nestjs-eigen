import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { BookService } from './book.service';

// @UseGuards(JwtGuard)
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('/')
  index(@Req() request: Request) {
    return this.bookService.list();
  }
}
