import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
// import moment from 'moment';

@Injectable()
export class MemberService {
  constructor(
    private prismaService: PrismaService,
  ) {}
  /**
   * Get member list
   * @returns []
   */
  async list() {
    const books =
      await this.prismaService.member.findMany({
        include: {
          books: {
            where: {
              returnedAt: null,
            },
            select: {
              book: true,
            },
          },
        },
      });
    return books.map((item) => {
      item['countBookBorrowed'] =
        item.books.length;
      return item;
    });
  }
  /**
   * Member borrow a book
   * @param memberId
   * @param bookId
   * @returns
   */
  async borrowBook(
    memberId: string,
    bookId: string,
  ) {
    const member =
      await this.prismaService.member.findFirst({
        where: {
          id: memberId,
        },
        include: {
          books: {
            where: {
              returnedAt: null,
            },
          },
        },
      });
    console.log('MEMBER', member);

    if (member.isOnPenalty) {
      throw new ForbiddenException(
        "Oops, you're currently pinalize and don't have borrow a book.",
      );
    }

    if (member.books.length >= 2) {
      throw new ForbiddenException(
        'You are already borrowed 2 books.',
      );
    }

    const book =
      await this.prismaService.book.findFirst({
        where: {
          id: bookId,
        },
        include: {
          members: {
            where: {
              returnedAt: null,
            },
          },
        },
      });

    if (book.stock - book.members.length < 1) {
      throw new ForbiddenException(
        'This book is out of stock.',
      );
    }
    try {
      return await this.prismaService.member.update(
        {
          where: {
            id: member.id,
          },
          data: {
            books: {
              create: {
                bookId: book.id,
                createdAt: new Date(),
              },
            },
          },
          select: {
            name: true,
            books: true,
          },
        },
      );
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Book already taken.',
          );
        }
      }
      throw error;
    }
  }
  /**
   * Member return a book
   * @param memberId
   * @param bookId
   * @returns
   */
  async returnBook(
    memberId: string,
    bookId: string,
  ) {
    const member =
      await this.prismaService.member.findFirst({
        where: {
          id: memberId,
        },
        include: {
          books: {
            where: {
              bookId: bookId,
              returnedAt: null,
            },
          },
        },
      });
    console.log('MEMBER', member);

    const book =
      await this.prismaService.book.findFirst({
        where: {
          id: bookId,
        },
        include: {
          members: {
            where: {
              returnedAt: null,
            },
          },
        },
      });

    if (!book) {
      throw new NotFoundException(
        'Book not found.',
      );
    }

    if (member.books.length < 1) {
      throw new ForbiddenException(
        `You are not borrow book ${book.title}.`,
      );
    }
    let isOnPenalty = false;
    let returnDate = new Date();
    const borrowedBook =
      await this.prismaService.bookMember.findFirst(
        {
          where: {
            bookId: book.id,
            memberId: member.id,
          },
        },
      );

    try {
      // just update returnedAt
      // return await this.prismaService.member.update(
      //   {
      //     where: {
      //       id: member.id,
      //     },
      //     data: {
      //       books: {
      //         update: {
      //           where: {
      //             bookId_memberId: {
      //               bookId: book.id,
      //               memberId: member.id,
      //             },
      //           },
      //           data: {
      //             returnedAt: new Date(),
      //           },
      //         },
      //       },
      //     },
      //     select: {
      //       name: true,
      //       books: true,
      //     },
      //   },
      // );

      // direct delete many to many
      return await this.prismaService.bookMember.delete(
        {
          where: {
            bookId_memberId: {
              bookId: book.id,
              memberId: member.id,
            },
          },
        },
      );
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Book already taken.',
          );
        }
      }
      throw error;
    }
  }
}
