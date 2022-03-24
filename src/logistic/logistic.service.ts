import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LogisticDto } from './dto';

@Injectable()
export class LogisticService {
  constructor(
    private prismaService: PrismaService,
  ) {}
  /**
   * Create new logistic
   * @param dto LogisticDto
   * @returns Logistic
   */
  async add(dto: LogisticDto) {
    try {
      return await this.prismaService.logistic.create(
        {
          data: {
            logistic_name: dto.logistic_name,
            amount: dto.amount,
            destination_name:
              dto.destination_name,
            origin_name: dto.origin_name,
            duration: dto.duration,
          },
          select: {
            id: true,
            logistic_name: true,
            amount: true,
            destination_name: true,
            origin_name: true,
            duration: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get logistic list
   * @param origin string
   * @param destination string
   * @returns []
   */
  async list(
    origin: string,
    destination: string,
  ) {
    let filter = {};

    if (origin && origin.length) {
      filter = {
        ...filter,
        ...{
          origin_name: {
            contains: origin,
            mode: 'insensitive',
          },
        },
      };
    }

    if (destination && destination.length) {
      filter = {
        ...filter,
        ...{
          destination_name: {
            contains: destination,
            mode: 'insensitive',
          },
        },
      };
    }

    const logistics =
      await this.prismaService.logistic.findMany({
        where: filter,
      });
    return logistics;
  }
}
