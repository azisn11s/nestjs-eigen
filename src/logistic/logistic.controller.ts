import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { LogisticDto } from './dto';
import { LogisticService } from './logistic.service';

@UseGuards(JwtGuard)
@Controller('logistics')
export class LogisticController {
  constructor(
    private logisticService: LogisticService,
  ) {}
  /**
   * Get list logistics
   * @param origin_name string
   * @param destination_name string
   * @returns []
   */
  @Get('/')
  index(@Req() request: Request) {
    const origin = request.query.origin_name
      ? request.query.origin_name.toString()
      : null;
    const destination = request.query
      .destination_name
      ? request.query.destination_name.toString()
      : null;
    console.log([origin, destination]);

    return this.logisticService.list(
      origin,
      destination,
    );
  }
  /**
   * Create logistic and store into table db
   * @param dto LogisticDto
   * @returns any
   */
  @Post('/')
  store(@Body() dto: LogisticDto) {
    return this.logisticService.add(dto);
  }
}
