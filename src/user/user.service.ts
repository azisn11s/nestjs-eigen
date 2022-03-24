import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  /**
   * Get users
   */
  async list() {
    const users =
      await this.prismaService.user.findMany();
    return users;
  }

  /**
   * Add new user
   */
  async add(dto: RegisterDto) {
    try {
      // generate hash (bcrypt)
      const hashCode = await bcrypt.hash(
        dto.password,
        10,
      );

      // save new user
      const user =
        await this.prismaService.user.create({
          data: {
            username: dto.username,
            msisdn: dto.msisdn,
            password: hashCode,
            name: dto.name,
          },
          //   select: {
          //     id: true,
          //     email: true,
          //     created_at: true,
          //   },
        });

      //   delete user.password;
      return user;
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credential taken.',
          );
        }
      }

      throw error;
    }
  }

  /**
   * Get user detail
   * @param userId string
   * @returns User
   */
  async detail(userId: string) {
    const user =
      await this.prismaService.user.findFirst({
        where: {
          id: userId,
        },
        // select: {
        //   id: true,
        //   name: true,
        //   email: true,
        //   createdAt: true,
        //   Address: true,
        // },
      });
    return user;
  }
}
