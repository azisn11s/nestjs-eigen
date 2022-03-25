import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(
    private prismaService: PrismaService,
  ) {}
  /**
   * Get book list
   * @returns []
   */
  async list() {
    const filter = {};

    const books =
      await this.prismaService.book.findMany({
        where: filter,
        include: {
          members: {
            where: {
              returnedAt: null,
            },
          },
        },
      });
    return books.map((item) => {
      item['countAvailable'] =
        item.stock - item.members.length;
      return item;
    });
  }
}
